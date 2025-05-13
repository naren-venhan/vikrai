import { createTaxRateRulesWorkflow } from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"
import { AdminCreateTaxRateRuleType } from "../../validators"
import { refetchTaxRate } from "../../helpers"
import { HttpTypes } from "@vikrai/framework/types"

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminCreateTaxRateRuleType>,
  res: vikraiResponse<HttpTypes.AdminTaxRateResponse>
) => {
  await createTaxRateRulesWorkflow(req.scope).run({
    input: {
      rules: [
        {
          ...req.validatedBody,
          tax_rate_id: req.params.id,
          created_by: req.auth_context.actor_id,
        },
      ],
    },
  })

  const taxRate = await refetchTaxRate(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )
  res.status(200).json({ tax_rate: taxRate })
}
