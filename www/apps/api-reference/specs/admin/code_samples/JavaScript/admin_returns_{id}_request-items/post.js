import vikrai from "@vikrai/js-sdk"

export const sdk = new vikrai({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.return.addReturnItem("return_123", {
  id: "orlitem_123",
  quantity: 1,
})
.then(({ return }) => {
  console.log(return)
})
