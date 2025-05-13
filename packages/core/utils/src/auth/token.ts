import jwt from "jsonwebtoken"
import { vikraiError } from "../common"

export const generateJwtToken = (
  tokenPayload: Record<string, unknown>,
  jwtConfig: {
    secret: string | undefined
    expiresIn: string | undefined
  }
) => {
  if (!jwtConfig.secret || !jwtConfig.expiresIn) {
    throw new vikraiError(
      vikraiError.Types.INVALID_ARGUMENT,
      "JWT secret and expiresIn must be provided when generating a token"
    )
  }

  return jwt.sign(tokenPayload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  })
}

