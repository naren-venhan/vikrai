import { vikraiError, RuleType } from "@vikrai/framework/utils"

const validRuleTypes: string[] = Object.values(RuleType)

export function validateRuleType(ruleType: string) {
  const underscorizedRuleType = ruleType.split("-").join("_")

  if (!validRuleTypes.includes(underscorizedRuleType)) {
    throw new vikraiError(
      vikraiError.Types.INVALID_DATA,
      `Invalid param rule_type (${ruleType})`
    )
  }
}

