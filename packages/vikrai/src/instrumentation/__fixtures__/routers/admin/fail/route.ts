import { vikraiError } from "@vikrai/framework/utils"
import { Request, Response } from "express"

export function GET(req: Request, res: Response) {
  throw new vikraiError(vikraiError.Types.INVALID_DATA, "Failed")
}

