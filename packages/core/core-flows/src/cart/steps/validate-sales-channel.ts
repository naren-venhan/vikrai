import { vikraiError } from "@vikrai/framework/utils"
import { createStep, StepResponse } from "@vikrai/framework/workflows-sdk"

import { SalesChannelDTO } from "@vikrai/types"

export const validateSalesChannelStep = createStep(
  "validate-sales-channel",
  async (data: { salesChannel: SalesChannelDTO }) => {
    const { salesChannel } = data

    if (!salesChannel?.id) {
      throw new vikraiError(
        vikraiError.Types.INVALID_DATA,
        "Sales channel is required when creating a cart. Either provide a sales channel ID or set the default sales channel for the store."
      )
    }

    return new StepResponse(void 0)
  }
)

