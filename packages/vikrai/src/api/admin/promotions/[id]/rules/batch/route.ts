import { batchPromotionRulesWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { BatchMethodRequest, HttpTypes } from "@vikrai/framework/types"
import { RuleType } from "@vikrai/framework/utils"
import { refetchBatchRules } from "../../../helpers"

export const POST = async (
  req: AuthenticatedvikraiRequest<
    BatchMethodRequest<
      HttpTypes.AdminCreatePromotionRule,
      HttpTypes.AdminUpdatePromotionRule
    >
  >,
  res: vikraiResponse<HttpTypes.AdminPromotionRuleBatchResponse>
) => {
  const id = req.params.id
  const { result } = await batchPromotionRulesWorkflow(req.scope).run({
    input: {
      id,
      rule_type: RuleType.RULES,
      create: req.validatedBody.create,
      update: req.validatedBody.update,
      delete: req.validatedBody.delete,
    },
  })

  const batchResults = await refetchBatchRules(
    result,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json(batchResults)
}
