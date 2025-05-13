import { Context } from "@vikrai/types"
import { vikraiContextType } from "./context-parameter"

export function InjectSharedContext(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: any
  ): void {
    if (!target.vikraiContextIndex_) {
      throw new Error(
        `To apply @InjectSharedContext you have to flag a parameter using @vikraiContext`
      )
    }

    const originalMethod = descriptor.value
    const argIndex = target.vikraiContextIndex_[propertyKey]

    descriptor.value = function (...args: any[]) {
      const context: Context = {
        ...(args[argIndex] ?? { __type: vikraiContextType }),
      }
      args[argIndex] = context

      return originalMethod.apply(this, args)
    }
  }
}

