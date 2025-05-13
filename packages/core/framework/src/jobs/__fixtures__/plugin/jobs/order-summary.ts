import { vikraiContainer } from "@vikrai/types"

export default async function handler(container: vikraiContainer) {
  console.log(`You have received 5 orders today`)
}

export const config = {
  name: "summarize-orders",
  schedule: "* * * * * *",
  numberOfExecutions: 2,
}

