import vikrai from "@vikrai/js-sdk"

export const sdk = new vikrai({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.product.retrieveVariant(
  "prod_123",
  "variant_123"
)
.then(({ variant }) => {
  console.log(variant)
})
