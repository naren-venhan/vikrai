export function vikraiContext() {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    target.vikraiContextIndex_ ??= {}
    target.vikraiContextIndex_[propertyKey] = parameterIndex
  }
}

vikraiContext.getIndex = function (
  target: any,
  propertyKey: string
): number | undefined {
  return target.vikraiContextIndex_?.[propertyKey]
}

export const vikraiContextType = "vikraiContext"

