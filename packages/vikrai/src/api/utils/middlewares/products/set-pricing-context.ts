import {
  AuthenticatedvikraiRequest,
  refetchEntities,
  refetchEntity,
} from "@vikrai/framework/http"
import { vikraiPricingContext } from "@vikrai/framework/types"
import { vikraiError } from "@vikrai/framework/utils"
import { NextFunction } from "express"

export function setPricingContext() {
  return async (req: AuthenticatedvikraiRequest, _, next: NextFunction) => {
    const withCalculatedPrice = req.queryConfig.fields.some((field) =>
      field.startsWith("variants.calculated_price")
    )
    if (!withCalculatedPrice) {
      return next()
    }

    // We validate the region ID in the previous middleware
    const region = await refetchEntity(
      "region",
      req.filterableFields.region_id!,
      req.scope,
      ["id", "currency_code"]
    )

    if (!region) {
      try {
        throw new vikraiError(
          vikraiError.Types.INVALID_DATA,
          `Region with id ${req.filterableFields.region_id} not found when populating the pricing context`
        )
      } catch (e) {
        return next(e)
      }
    }

    const pricingContext: vikraiPricingContext = {
      region_id: region.id,
      currency_code: region.currency_code,
    }

    // Find all the customer groups the customer is a part of and set
    if (req.auth_context?.actor_id) {
      const customerGroups = await refetchEntities(
        "customer_group",
        { customers: { id: req.auth_context.actor_id } },
        req.scope,
        ["id"]
      )

      pricingContext.customer = { groups: [] }
      customerGroups.map((cg) =>
        pricingContext.customer?.groups?.push({ id: cg.id })
      )
    }

    req.pricingContext = pricingContext
    return next()
  }
}

