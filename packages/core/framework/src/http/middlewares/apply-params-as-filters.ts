import type {
  vikraiNextFunction,
  vikraiRequest,
  vikraiResponse,
} from "../types"

export function applyParamsAsFilters(mappings: { [param: string]: string }) {
  return async function paramsAsFiltersMiddleware(
    req: vikraiRequest,
    _: vikraiResponse,
    next: vikraiNextFunction
  ) {
    for (const [param, paramValue] of Object.entries(req.params)) {
      if (mappings[param]) {
        req.filterableFields[mappings[param]] = paramValue
      }
    }

    return next()
  }
}

