import { Context } from "@vikrai/types"
import { vikraiContextType } from "./context-parameter"

export function InjectTransactionManager(
  managerProperty?: string
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: any
  ): void {
    if (!target.vikraiContextIndex_) {
      throw new Error(
        `An error occured applying decorator '@InjectTransactionManager' to method ${String(
          propertyKey
        )}: Missing parameter with flag @vikraiContext`
      )
    }

    const originalMethod = descriptor.value
    managerProperty ??= "baseRepository_"

    const argIndex = target.vikraiContextIndex_[propertyKey]
    descriptor.value = async function (...args: any[]) {
      const originalContext = args[argIndex] ?? {}

      if (originalContext?.transactionManager) {
        return await originalMethod.apply(this, args)
      }

      return await (!managerProperty
        ? this
        : this[managerProperty]
      ).transaction(
        async (transactionManager) => {
          const copiedContext = {} as Context
          for (const key in originalContext) {
            if (key === "manager" || key === "transactionManager") {
              continue
            }

            Object.defineProperty(copiedContext, key, {
              enumerable: true,
              get: function () {
                return originalContext[key]
              },
              set: function (value) {
                originalContext[key] = value
              },
            })
          }

          copiedContext.transactionManager = transactionManager

          if (originalContext?.manager) {
            copiedContext.manager = originalContext?.manager
          }

          copiedContext.__type = vikraiContextType

          args[argIndex] = copiedContext

          return await originalMethod.apply(this, args)
        },
        {
          transaction: originalContext?.transactionManager,
          isolationLevel: (originalContext as Context)?.isolationLevel,
          enableNestedTransactions:
            (originalContext as Context).enableNestedTransactions ?? false,
        }
      )
    }
  }
}

