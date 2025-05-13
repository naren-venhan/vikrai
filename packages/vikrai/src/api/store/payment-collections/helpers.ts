import {
  vikraiContainer,
  PaymentCollectionDTO,
} from "@vikrai/framework/types"
import { refetchEntity } from "@vikrai/framework/http"

export const refetchPaymentCollection = async (
  id: string,
  scope: vikraiContainer,
  fields: string[]
): Promise<PaymentCollectionDTO> => {
  return refetchEntity("payment_collection", id, scope, fields)
}

