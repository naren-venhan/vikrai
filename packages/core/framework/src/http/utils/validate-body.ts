import { z } from "zod"
import { NextFunction } from "express"
import { vikraiRequest, vikraiResponse } from "../types"
import { zodValidator } from "../../zod/zod-helpers"

export function validateAndTransformBody(
  zodSchema:
    | z.ZodObject<any, any>
    | ((
        customSchema?: z.ZodOptional<z.ZodNullable<z.ZodObject<any, any>>>
      ) => z.ZodObject<any, any> | z.ZodEffects<any, any>)
): (
  req: vikraiRequest,
  res: vikraiResponse,
  next: NextFunction
) => Promise<void> {
  return async function validateBody(
    req: vikraiRequest,
    _: vikraiResponse,
    next: NextFunction
  ) {
    try {
      let schema: z.ZodObject<any, any> | z.ZodEffects<any, any>
      if (typeof zodSchema === "function") {
        schema = zodSchema(req.additionalDataValidator)
      } else {
        schema = zodSchema
      }

      req.validatedBody = await zodValidator(schema, req.body)
      next()
    } catch (e) {
      next(e)
    }
  }
}

