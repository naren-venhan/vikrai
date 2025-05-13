import vikrai from "@vikrai/js-sdk"

export const sdk = new vikrai({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.apiKey.update("apk_123", {
  title: "Development"
})
.then(({ api_key }) => {
  console.log(api_key)
})
