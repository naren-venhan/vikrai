const { Modules } = require("@vikrai/utils")

const DB_HOST = process.env.DB_HOST
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_TEMP_NAME
const DB_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
process.env.POSTGRES_URL = DB_URL
process.env.LOG_LEVEL = "error"

const enablevikraiV2 = process.env.vikrai_FF_vikrai_V2 == "true"

const customTaxProviderRegistration = {
  resolve: {
    services: [require("@vikrai/tax/dist/providers/system").default],
  },
  id: "system_2",
}

const customPaymentProvider = {
  resolve: {
    services: [require("@vikrai/payment/dist/providers/system").default],
  },
  id: "default_2",
}

const customFulfillmentProvider = {
  resolve: "@vikrai/fulfillment-manual",
  id: "test-provider",
}

const customFulfillmentProviderCalculated = {
  resolve: require("./dist/utils/providers/fulfillment-manual-calculated")
    .default,
  id: "test-provider-calculated",
}

module.exports = {
  admin: {
    disable: true,
  },
  plugins: [],
  projectConfig: {
    databaseUrl: DB_URL,
    databaseType: "postgres",
    http: {
      jwtSecret: "test",
      cookieSecret: "test",
    },
  },
  featureFlags: {
    vikrai_v2: enablevikraiV2,
  },
  modules: {
    testingModule: {
      resolve: "__tests__/__fixtures__/testing-module",
    },
    [Modules.AUTH]: {
      resolve: "@vikrai/auth",
      options: {
        providers: [
          {
            id: "emailpass",
            resolve: "@vikrai/auth-emailpass",
          },
        ],
      },
    },
    [Modules.USER]: {
      scope: "internal",
      resolve: "@vikrai/user",
      options: {
        jwt_secret: "test",
      },
    },
    [Modules.CACHE]: {
      resolve: "@vikrai/cache-inmemory",
      options: { ttl: 0 }, // Cache disabled
    },
    [Modules.LOCKING]: true,
    [Modules.STOCK_LOCATION]: {
      resolve: "@vikrai/stock-location",
      options: {},
    },
    [Modules.INVENTORY]: {
      resolve: "@vikrai/inventory",
      options: {},
    },
    [Modules.PRODUCT]: true,
    [Modules.PRICING]: true,
    [Modules.PROMOTION]: true,
    [Modules.REGION]: true,
    [Modules.CUSTOMER]: true,
    [Modules.SALES_CHANNEL]: true,
    [Modules.CART]: true,
    [Modules.WORKFLOW_ENGINE]: true,
    [Modules.API_KEY]: true,
    [Modules.STORE]: true,
    [Modules.TAX]: {
      resolve: "@vikrai/tax",
      options: {
        providers: [customTaxProviderRegistration],
      },
    },
    [Modules.CURRENCY]: true,
    [Modules.ORDER]: true,
    [Modules.PAYMENT]: {
      resolve: "@vikrai/payment",
      /** @type {import('@vikrai/payment').PaymentModuleOptions}*/
      options: {
        providers: [customPaymentProvider],
      },
    },
    [Modules.FULFILLMENT]: {
      /** @type {import('@vikrai/fulfillment').FulfillmentModuleOptions} */
      options: {
        providers: [
          customFulfillmentProvider,
          customFulfillmentProviderCalculated,
        ],
      },
    },
    [Modules.NOTIFICATION]: {
      /** @type {import('@vikrai/types').LocalNotificationServiceOptions} */
      options: {
        providers: [
          {
            resolve: "@vikrai/notification-local",
            id: "local-notification-provider",
            options: {
              name: "Local Notification Provider",
              channels: ["log", "email"],
            },
          },
        ],
      },
    },
    [Modules.INDEX]: process.env.ENABLE_INDEX_MODULE
      ? {
          resolve: "@vikrai/index",
        }
      : false,
  },
}

