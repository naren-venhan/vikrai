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

sdk.store.cart.complete("cart_123")
.then((data) => {
  if(data.type === "cart") {
    // an error occurred
    console.log(data.error, data.cart)
  } else {
    // order placed successfully
    console.log(data.order)
  }
})
