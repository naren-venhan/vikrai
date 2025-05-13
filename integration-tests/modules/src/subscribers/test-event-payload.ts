import { SubscriberConfig } from "@vikrai/vikrai"

const testEventPayloadHandlerMock = jest.fn()

export default testEventPayloadHandlerMock

export const config: SubscriberConfig = {
  event: "test-event-payload",
}

