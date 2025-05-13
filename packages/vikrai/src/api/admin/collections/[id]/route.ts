import {
  deleteCollectionsWorkflow,
  updateCollectionsWorkflow,
} from "@vikrai/core-flows"
import {
  AuthenticatedvikraiRequest,
  vikraiResponse,
} from "@vikrai/framework/http"

import { AdditionalData, HttpTypes } from "@vikrai/framework/types"
import { vikraiError } from "@vikrai/framework/utils"
import { refetchCollection } from "../helpers"
import { AdminUpdateCollectionType } from "../validators"

export const GET = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminCollectionResponse>
) => {
  const collection = await refetchCollection(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ collection })
}

export const POST = async (
  req: AuthenticatedvikraiRequest<AdminUpdateCollectionType & AdditionalData>,
  res: vikraiResponse<HttpTypes.AdminCollectionResponse>
) => {
  const existingCollection = await refetchCollection(req.params.id, req.scope, [
    "id",
  ])
  if (!existingCollection) {
    throw new vikraiError(
      vikraiError.Types.NOT_FOUND,
      `Collection with id "${req.params.id}" not found`
    )
  }

  const { additional_data, ...rest } = req.validatedBody

  await updateCollectionsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: rest,
      additional_data,
    },
  })

  const collection = await refetchCollection(
    req.params.id,
    req.scope,
    req.queryConfig.fields
  )

  res.status(200).json({ collection })
}

export const DELETE = async (
  req: AuthenticatedvikraiRequest,
  res: vikraiResponse<HttpTypes.AdminCollectionDeleteResponse>
) => {
  const id = req.params.id

  await deleteCollectionsWorkflow(req.scope).run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "collection",
    deleted: true,
  })
}
