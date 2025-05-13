import type {
  vikraiNextFunction,
  vikraiRequest,
  vikraiResponse,
} from "../types"

export function clearFiltersByKey(keys: string[]) {
  return async function clearFiltersByKeyMiddleware(
    req: vikraiRequest,
    _: vikraiResponse,
    next: vikraiNextFunction
  ) {
    keys.forEach((key) => {
      delete req.filterableFields[key]
    })

    return next()
  }
}

