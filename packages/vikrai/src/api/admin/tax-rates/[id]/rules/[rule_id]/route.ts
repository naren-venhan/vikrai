import { deleteTaxRateRulesWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { refetchTaxRate } from "../../../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminTaxRateRuleDeleteResponse>
) => {
  await deleteTaxRateRulesWorkflow(req.scope).run({
    input: { ids: [req.params.rule_id] },
  })

  const taxRate = await refetchTaxRate(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({
    id: req.params.rule_id,
    object: "tax_rate_rule",
    deleted: true,
    parent: taxRate,
  })
}
