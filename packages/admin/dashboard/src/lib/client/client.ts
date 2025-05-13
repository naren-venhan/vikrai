import vikrai from "@vikrai/js-sdk"

export const backendUrl = __BACKEND_URL__ ?? "/"

export const sdk = new vikrai({
  baseUrl: backendUrl,
  auth: {
    type: "session",
  },
})

// useful when you want to call the BE from the console and try things out quickly
if (typeof window !== "undefined") {
  ;(window as any).__sdk = sdk
}

