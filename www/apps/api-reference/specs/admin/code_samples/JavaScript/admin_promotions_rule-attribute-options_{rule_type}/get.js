import vikrai from "@vikrai/js-sdk"

export const sdk = new vikrai({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.promotion.listRuleAttributes("rules", "standard")
.then(({ attributes }) => {
  console.log(attributes)
})
