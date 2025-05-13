import vikrai from "@vikrai/js-sdk"

export const sdk = new vikrai({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.shippingOption.create({
  name: "Standard Shipping",
  profile_id: "shp_123",
})
.then(({ shipping_option }) => {
  console.log(shipping_option)
})
