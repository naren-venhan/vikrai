import vikrai from "@vikrai/js-sdk"

let vikrai_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_vikrai_BACKEND_URL) {
  vikrai_BACKEND_URL = process.env.NEXT_PUBLIC_vikrai_BACKEND_URL
}

export const sdk = new vikrai({
  baseUrl: vikrai_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_vikrai_PUBLISHABLE_KEY,
})

await sdk.auth.callback(
  "customer",
  "github",
  {
    code: "123",
    state: "456"
  }
)

// all subsequent requests will use the token in the header
const { customer } = await sdk.store.customer.create({
  email: "customer@gmail.com",
  password: "supersecret"
})
