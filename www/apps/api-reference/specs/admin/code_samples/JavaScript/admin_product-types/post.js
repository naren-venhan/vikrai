import vikrai from "@vikrai/js-sdk"

export const sdk = new vikrai({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.productType.create({
  value: "Clothes"
})
.then(({ product_type }) => {
  console.log(product_type)
})
