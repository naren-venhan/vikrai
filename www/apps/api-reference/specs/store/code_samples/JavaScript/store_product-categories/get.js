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

sdk.store.category.list()
.then(({ product_categories, count, offset, limit }) => {
  console.log(product_categories)
})
