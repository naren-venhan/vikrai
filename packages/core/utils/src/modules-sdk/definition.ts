export const Modules = {
  AUTH: "auth",
  CACHE: "cache",
  CART: "cart",
  CUSTOMER: "customer",
  EVENT_BUS: "event_bus",
  INVENTORY: "inventory",
  LINK: "link_modules",
  PAYMENT: "payment",
  PRICING: "pricing",
  PRODUCT: "product",
  PROMOTION: "promotion",
  SALES_CHANNEL: "sales_channel",
  TAX: "tax",
  FULFILLMENT: "fulfillment",
  STOCK_LOCATION: "stock_location",
  USER: "user",
  WORKFLOW_ENGINE: "workflows",
  REGION: "region",
  ORDER: "order",
  API_KEY: "api_key",
  STORE: "store",
  CURRENCY: "currency",
  FILE: "file",
  NOTIFICATION: "notification",
  INDEX: "index",
  LOCKING: "locking",
} as const

export const MODULE_PACKAGE_NAMES = {
  [Modules.AUTH]: "@vikrai/vikrai/auth",
  [Modules.CACHE]: "@vikrai/vikrai/cache-inmemory",
  [Modules.CART]: "@vikrai/vikrai/cart",
  [Modules.CUSTOMER]: "@vikrai/vikrai/customer",
  [Modules.EVENT_BUS]: "@vikrai/vikrai/event-bus-local",
  [Modules.INVENTORY]: "@vikrai/vikrai/inventory",
  [Modules.LINK]: "@vikrai/vikrai/link-modules",
  [Modules.PAYMENT]: "@vikrai/vikrai/payment",
  [Modules.PRICING]: "@vikrai/vikrai/pricing",
  [Modules.PRODUCT]: "@vikrai/vikrai/product",
  [Modules.PROMOTION]: "@vikrai/vikrai/promotion",
  [Modules.SALES_CHANNEL]: "@vikrai/vikrai/sales-channel",
  [Modules.FULFILLMENT]: "@vikrai/vikrai/fulfillment",
  [Modules.STOCK_LOCATION]: "@vikrai/vikrai/stock-location",
  [Modules.TAX]: "@vikrai/vikrai/tax",
  [Modules.USER]: "@vikrai/vikrai/user",
  [Modules.WORKFLOW_ENGINE]: "@vikrai/vikrai/workflow-engine-inmemory",
  [Modules.REGION]: "@vikrai/vikrai/region",
  [Modules.ORDER]: "@vikrai/vikrai/order",
  [Modules.API_KEY]: "@vikrai/vikrai/api-key",
  [Modules.STORE]: "@vikrai/vikrai/store",
  [Modules.CURRENCY]: "@vikrai/vikrai/currency",
  [Modules.FILE]: "@vikrai/vikrai/file",
  [Modules.NOTIFICATION]: "@vikrai/vikrai/notification",
  [Modules.INDEX]: "@vikrai/vikrai/index-module",
  [Modules.LOCKING]: "@vikrai/vikrai/locking",
}

export const REVERSED_MODULE_PACKAGE_NAMES = Object.entries(
  MODULE_PACKAGE_NAMES
).reduce((acc, [key, value]) => {
  acc[value] = key
  return acc
}, {})

// TODO: temporary fix until the event bus, cache and workflow engine are migrated to use providers and therefore only a single resolution will be good
export const TEMPORARY_REDIS_MODULE_PACKAGE_NAMES = {
  [Modules.EVENT_BUS]: "@vikrai/vikrai/event-bus-redis",
  [Modules.CACHE]: "@vikrai/vikrai/cache-redis",
  [Modules.WORKFLOW_ENGINE]: "@vikrai/vikrai/workflow-engine-redis",
  [Modules.LOCKING]: "@vikrai/vikrai/locking-redis",
}

REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.EVENT_BUS]
] = Modules.EVENT_BUS
REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.CACHE]
] = Modules.CACHE
REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.WORKFLOW_ENGINE]
] = Modules.WORKFLOW_ENGINE
REVERSED_MODULE_PACKAGE_NAMES[
  TEMPORARY_REDIS_MODULE_PACKAGE_NAMES[Modules.LOCKING]
] = Modules.LOCKING

/**
 * Making modules be referenced as a type as well.
 */
export type Modules = (typeof Modules)[keyof typeof Modules]
export const ModuleRegistrationName = Modules

