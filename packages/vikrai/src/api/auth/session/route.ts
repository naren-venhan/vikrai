import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

export const POST = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse
) => {
  req.session.auth_context = req.auth_context

  res.status(200).json({ user: req.auth_context })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse
) => {
  req.session.destroy()
  res.json({ success: true })
}

