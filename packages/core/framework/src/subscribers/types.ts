import { Event, vikraiContainer } from "@vikrai/types"

interface SubscriberContext extends Record<string, unknown> {
  subscriberId?: string
}

export type SubscriberConfig = {
  event: string | string[]
  context?: SubscriberContext
}

export type SubscriberArgs<T = unknown> = {
  event: Event<T>
  container: vikraiContainer
  pluginOptions: Record<string, unknown>
}

