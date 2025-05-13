import { Request, Response } from "express"
import { vikraiError } from "@vikrai/utils"

export const GET = async (req: Request, res: Response) => {
  throw new vikraiError(vikraiError.Types.NOT_ALLOWED, "Not allowed")
}

