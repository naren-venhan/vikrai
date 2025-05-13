import { HttpTypes } from "@vikrai/framework/types"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { getRuleAttributesMap, validateRuleType } from "../../utils"

export const GET = async (
  req: AuthenticatedvikraiRequest<HttpTypes.AdminGetPromotionRuleParams>,
  res: vikraiResponse<HttpTypes.AdminRuleAttributeOptionsListResponse>
) => {
  const { rule_type: ruleType } = req.params

  validateRuleType(ruleType)

  const attributes =
    getRuleAttributesMap({
      promotionType: req.query.promotion_type as string,
      applicationMethodType: req.query.application_method_type as string,
    })[ruleType] || []

  res.json({
    attributes,
  })
}
