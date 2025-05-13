import vikrai from "@vikrai/js-sdk"

export const sdk = new vikrai({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.auth.resetPassword(
  "user",
  "emailpass",
  {
    identifier: "user@gmail.com"
  }
)
.then(() => {
  // user receives token
})
