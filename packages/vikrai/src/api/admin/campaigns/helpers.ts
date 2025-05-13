import { vikraiContainer } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@vikrai/framework/utils"

export const refetchCampaign = async (
  campaignId: string,
  scope: vikraiContainer,
  fields: string[]
) => {
  const remoteQuery = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "campaign",
    variables: {
      filters: { id: campaignId },
    },
    fields: fields,
  })

  const campaigns = await remoteQuery(queryObject)
  return campaigns[0]
}

