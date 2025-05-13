import vikrai from "@vikrai/js-sdk"

export const sdk = new vikrai({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.apiKey.create({
  title: "Development",
  type: "publishable"
})
.then(({ api_key }) => {
  console.log(api_key)
})
