import vikrai from "@vikrai/js-sdk"

export const sdk = new vikrai({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: {
    type: "session",
  },
})

sdk.admin.inventoryItem.listLevels("iitem_123")
.then(({ inventory_levels, count, limit, offset }) => {
  console.log(inventory_levels)
})
