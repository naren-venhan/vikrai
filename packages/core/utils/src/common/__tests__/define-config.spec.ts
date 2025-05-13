import { Modules } from "../../modules-sdk"
import { DEFAULT_STORE_RESTRICTED_FIELDS, defineConfig } from "../define-config"

describe("defineConfig", function () {
  it("should merge empty config with the defaults", function () {
    expect(defineConfig()).toMatchInlineSnapshot(`
      {
        "admin": {
          "backendUrl": "/",
          "path": "/app",
        },
        "featureFlags": {},
        "modules": {
          "api_key": {
            "resolve": "@vikrai/vikrai/api-key",
          },
          "auth": {
            "options": {
              "providers": [
                {
                  "id": "emailpass",
                  "resolve": "@vikrai/vikrai/auth-emailpass",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/auth",
          },
          "cache": {
            "resolve": "@vikrai/vikrai/cache-inmemory",
          },
          "cart": {
            "resolve": "@vikrai/vikrai/cart",
          },
          "currency": {
            "resolve": "@vikrai/vikrai/currency",
          },
          "customer": {
            "resolve": "@vikrai/vikrai/customer",
          },
          "event_bus": {
            "resolve": "@vikrai/vikrai/event-bus-local",
          },
          "file": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "resolve": "@vikrai/vikrai/file-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/file",
          },
          "fulfillment": {
            "options": {
              "providers": [
                {
                  "id": "manual",
                  "resolve": "@vikrai/vikrai/fulfillment-manual",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/fulfillment",
          },
          "inventory": {
            "resolve": "@vikrai/vikrai/inventory",
          },
          "locking": {
            "resolve": "@vikrai/vikrai/locking",
          },
          "notification": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "options": {
                    "channels": [
                      "feed",
                    ],
                    "name": "Local Notification Provider",
                  },
                  "resolve": "@vikrai/vikrai/notification-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/notification",
          },
          "order": {
            "resolve": "@vikrai/vikrai/order",
          },
          "payment": {
            "resolve": "@vikrai/vikrai/payment",
          },
          "pricing": {
            "resolve": "@vikrai/vikrai/pricing",
          },
          "product": {
            "resolve": "@vikrai/vikrai/product",
          },
          "promotion": {
            "resolve": "@vikrai/vikrai/promotion",
          },
          "region": {
            "resolve": "@vikrai/vikrai/region",
          },
          "sales_channel": {
            "resolve": "@vikrai/vikrai/sales-channel",
          },
          "stock_location": {
            "resolve": "@vikrai/vikrai/stock-location",
          },
          "store": {
            "resolve": "@vikrai/vikrai/store",
          },
          "tax": {
            "resolve": "@vikrai/vikrai/tax",
          },
          "user": {
            "options": {
              "jwt_secret": "supersecret",
            },
            "resolve": "@vikrai/vikrai/user",
          },
          "workflows": {
            "resolve": "@vikrai/vikrai/workflow-engine-inmemory",
          },
        },
        "plugins": [],
        "projectConfig": {
          "databaseUrl": "postgres://localhost/vikrai-starter-default",
          "http": {
            "adminCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "authCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "cookieSecret": "supersecret",
            "jwtSecret": "supersecret",
            "restrictedFields": {
              "store": [
                ${DEFAULT_STORE_RESTRICTED_FIELDS.map((v) => `"${v}"`).join(
                  ",\n                "
                )},
              ],
            },
            "storeCors": "http://localhost:8000",
          },
          "redisOptions": {
            "retryStrategy": [Function],
          },
          "sessionOptions": {},
        },
      }
    `)
  })

  it("should merge custom modules", function () {
    expect(
      defineConfig({
        modules: {
          GithubModuleService: {
            resolve: "./modules/github",
          },
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "admin": {
          "backendUrl": "/",
          "path": "/app",
        },
        "featureFlags": {},
        "modules": {
          "GithubModuleService": {
            "resolve": "./modules/github",
          },
          "api_key": {
            "resolve": "@vikrai/vikrai/api-key",
          },
          "auth": {
            "options": {
              "providers": [
                {
                  "id": "emailpass",
                  "resolve": "@vikrai/vikrai/auth-emailpass",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/auth",
          },
          "cache": {
            "resolve": "@vikrai/vikrai/cache-inmemory",
          },
          "cart": {
            "resolve": "@vikrai/vikrai/cart",
          },
          "currency": {
            "resolve": "@vikrai/vikrai/currency",
          },
          "customer": {
            "resolve": "@vikrai/vikrai/customer",
          },
          "event_bus": {
            "resolve": "@vikrai/vikrai/event-bus-local",
          },
          "file": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "resolve": "@vikrai/vikrai/file-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/file",
          },
          "fulfillment": {
            "options": {
              "providers": [
                {
                  "id": "manual",
                  "resolve": "@vikrai/vikrai/fulfillment-manual",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/fulfillment",
          },
          "inventory": {
            "resolve": "@vikrai/vikrai/inventory",
          },
          "locking": {
            "resolve": "@vikrai/vikrai/locking",
          },
          "notification": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "options": {
                    "channels": [
                      "feed",
                    ],
                    "name": "Local Notification Provider",
                  },
                  "resolve": "@vikrai/vikrai/notification-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/notification",
          },
          "order": {
            "resolve": "@vikrai/vikrai/order",
          },
          "payment": {
            "resolve": "@vikrai/vikrai/payment",
          },
          "pricing": {
            "resolve": "@vikrai/vikrai/pricing",
          },
          "product": {
            "resolve": "@vikrai/vikrai/product",
          },
          "promotion": {
            "resolve": "@vikrai/vikrai/promotion",
          },
          "region": {
            "resolve": "@vikrai/vikrai/region",
          },
          "sales_channel": {
            "resolve": "@vikrai/vikrai/sales-channel",
          },
          "stock_location": {
            "resolve": "@vikrai/vikrai/stock-location",
          },
          "store": {
            "resolve": "@vikrai/vikrai/store",
          },
          "tax": {
            "resolve": "@vikrai/vikrai/tax",
          },
          "user": {
            "options": {
              "jwt_secret": "supersecret",
            },
            "resolve": "@vikrai/vikrai/user",
          },
          "workflows": {
            "resolve": "@vikrai/vikrai/workflow-engine-inmemory",
          },
        },
        "plugins": [],
        "projectConfig": {
          "databaseUrl": "postgres://localhost/vikrai-starter-default",
          "http": {
            "adminCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "authCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "cookieSecret": "supersecret",
            "jwtSecret": "supersecret",
            "restrictedFields": {
              "store": [
                ${DEFAULT_STORE_RESTRICTED_FIELDS.map((v) => `"${v}"`).join(
                  ",\n                "
                )},
              ],
            },
            "storeCors": "http://localhost:8000",
          },
          "redisOptions": {
            "retryStrategy": [Function],
          },
          "sessionOptions": {},
        },
      }
    `)
  })

  it("should merge custom modules when an array is provided", function () {
    expect(
      defineConfig({
        modules: [
          {
            resolve: require.resolve("../__fixtures__/define-config/github"),
            options: {
              apiKey: "test",
            },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      {
        "admin": {
          "backendUrl": "/",
          "path": "/app",
        },
        "featureFlags": {},
        "modules": {
          "GithubModuleService": {
            "options": {
              "apiKey": "test",
            },
            "resolve": "${require.resolve(
              "../__fixtures__/define-config/github"
            )}",
          },
          "api_key": {
            "resolve": "@vikrai/vikrai/api-key",
          },
          "auth": {
            "options": {
              "providers": [
                {
                  "id": "emailpass",
                  "resolve": "@vikrai/vikrai/auth-emailpass",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/auth",
          },
          "cache": {
            "resolve": "@vikrai/vikrai/cache-inmemory",
          },
          "cart": {
            "resolve": "@vikrai/vikrai/cart",
          },
          "currency": {
            "resolve": "@vikrai/vikrai/currency",
          },
          "customer": {
            "resolve": "@vikrai/vikrai/customer",
          },
          "event_bus": {
            "resolve": "@vikrai/vikrai/event-bus-local",
          },
          "file": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "resolve": "@vikrai/vikrai/file-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/file",
          },
          "fulfillment": {
            "options": {
              "providers": [
                {
                  "id": "manual",
                  "resolve": "@vikrai/vikrai/fulfillment-manual",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/fulfillment",
          },
          "inventory": {
            "resolve": "@vikrai/vikrai/inventory",
          },
          "locking": {
            "resolve": "@vikrai/vikrai/locking",
          },
          "notification": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "options": {
                    "channels": [
                      "feed",
                    ],
                    "name": "Local Notification Provider",
                  },
                  "resolve": "@vikrai/vikrai/notification-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/notification",
          },
          "order": {
            "resolve": "@vikrai/vikrai/order",
          },
          "payment": {
            "resolve": "@vikrai/vikrai/payment",
          },
          "pricing": {
            "resolve": "@vikrai/vikrai/pricing",
          },
          "product": {
            "resolve": "@vikrai/vikrai/product",
          },
          "promotion": {
            "resolve": "@vikrai/vikrai/promotion",
          },
          "region": {
            "resolve": "@vikrai/vikrai/region",
          },
          "sales_channel": {
            "resolve": "@vikrai/vikrai/sales-channel",
          },
          "stock_location": {
            "resolve": "@vikrai/vikrai/stock-location",
          },
          "store": {
            "resolve": "@vikrai/vikrai/store",
          },
          "tax": {
            "resolve": "@vikrai/vikrai/tax",
          },
          "user": {
            "options": {
              "jwt_secret": "supersecret",
            },
            "resolve": "@vikrai/vikrai/user",
          },
          "workflows": {
            "resolve": "@vikrai/vikrai/workflow-engine-inmemory",
          },
        },
        "plugins": [],
        "projectConfig": {
          "databaseUrl": "postgres://localhost/vikrai-starter-default",
          "http": {
            "adminCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "authCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "cookieSecret": "supersecret",
            "jwtSecret": "supersecret",
            "restrictedFields": {
              "store": [
                ${DEFAULT_STORE_RESTRICTED_FIELDS.map((v) => `"${v}"`).join(
                  ",\n                "
                )},
              ],
            },
            "storeCors": "http://localhost:8000",
          },
          "redisOptions": {
            "retryStrategy": [Function],
          },
          "sessionOptions": {},
        },
      }
    `)
  })

  it("should merge custom modules when an array is provided with a key to override the module registration name", function () {
    expect(
      defineConfig({
        modules: [
          {
            key: "GithubModuleServiceOverride",
            resolve: require.resolve("../__fixtures__/define-config/github"),
            options: {
              apiKey: "test",
            },
          },
        ],
      })
    ).toMatchInlineSnapshot(`
      {
        "admin": {
          "backendUrl": "/",
          "path": "/app",
        },
        "featureFlags": {},
        "modules": {
          "GithubModuleServiceOverride": {
            "options": {
              "apiKey": "test",
            },
            "resolve": "${require.resolve(
              "../__fixtures__/define-config/github"
            )}",
          },
          "api_key": {
            "resolve": "@vikrai/vikrai/api-key",
          },
          "auth": {
            "options": {
              "providers": [
                {
                  "id": "emailpass",
                  "resolve": "@vikrai/vikrai/auth-emailpass",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/auth",
          },
          "cache": {
            "resolve": "@vikrai/vikrai/cache-inmemory",
          },
          "cart": {
            "resolve": "@vikrai/vikrai/cart",
          },
          "currency": {
            "resolve": "@vikrai/vikrai/currency",
          },
          "customer": {
            "resolve": "@vikrai/vikrai/customer",
          },
          "event_bus": {
            "resolve": "@vikrai/vikrai/event-bus-local",
          },
          "file": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "resolve": "@vikrai/vikrai/file-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/file",
          },
          "fulfillment": {
            "options": {
              "providers": [
                {
                  "id": "manual",
                  "resolve": "@vikrai/vikrai/fulfillment-manual",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/fulfillment",
          },
          "inventory": {
            "resolve": "@vikrai/vikrai/inventory",
          },
          "locking": {
            "resolve": "@vikrai/vikrai/locking",
          },
          "notification": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "options": {
                    "channels": [
                      "feed",
                    ],
                    "name": "Local Notification Provider",
                  },
                  "resolve": "@vikrai/vikrai/notification-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/notification",
          },
          "order": {
            "resolve": "@vikrai/vikrai/order",
          },
          "payment": {
            "resolve": "@vikrai/vikrai/payment",
          },
          "pricing": {
            "resolve": "@vikrai/vikrai/pricing",
          },
          "product": {
            "resolve": "@vikrai/vikrai/product",
          },
          "promotion": {
            "resolve": "@vikrai/vikrai/promotion",
          },
          "region": {
            "resolve": "@vikrai/vikrai/region",
          },
          "sales_channel": {
            "resolve": "@vikrai/vikrai/sales-channel",
          },
          "stock_location": {
            "resolve": "@vikrai/vikrai/stock-location",
          },
          "store": {
            "resolve": "@vikrai/vikrai/store",
          },
          "tax": {
            "resolve": "@vikrai/vikrai/tax",
          },
          "user": {
            "options": {
              "jwt_secret": "supersecret",
            },
            "resolve": "@vikrai/vikrai/user",
          },
          "workflows": {
            "resolve": "@vikrai/vikrai/workflow-engine-inmemory",
          },
        },
        "plugins": [],
        "projectConfig": {
          "databaseUrl": "postgres://localhost/vikrai-starter-default",
          "http": {
            "adminCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "authCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "cookieSecret": "supersecret",
            "jwtSecret": "supersecret",
            "restrictedFields": {
              "store": [
                ${DEFAULT_STORE_RESTRICTED_FIELDS.map((v) => `"${v}"`).join(
                  ",\n                "
                )},
              ],
            },
            "storeCors": "http://localhost:8000",
          },
          "redisOptions": {
            "retryStrategy": [Function],
          },
          "sessionOptions": {},
        },
      }
    `)
  })

  it("should merge custom project.http config", function () {
    expect(
      defineConfig({
        projectConfig: {
          http: {
            adminCors: "http://localhost:3000",
          } as any,
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "admin": {
          "backendUrl": "/",
          "path": "/app",
        },
        "featureFlags": {},
        "modules": {
          "api_key": {
            "resolve": "@vikrai/vikrai/api-key",
          },
          "auth": {
            "options": {
              "providers": [
                {
                  "id": "emailpass",
                  "resolve": "@vikrai/vikrai/auth-emailpass",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/auth",
          },
          "cache": {
            "resolve": "@vikrai/vikrai/cache-inmemory",
          },
          "cart": {
            "resolve": "@vikrai/vikrai/cart",
          },
          "currency": {
            "resolve": "@vikrai/vikrai/currency",
          },
          "customer": {
            "resolve": "@vikrai/vikrai/customer",
          },
          "event_bus": {
            "resolve": "@vikrai/vikrai/event-bus-local",
          },
          "file": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "resolve": "@vikrai/vikrai/file-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/file",
          },
          "fulfillment": {
            "options": {
              "providers": [
                {
                  "id": "manual",
                  "resolve": "@vikrai/vikrai/fulfillment-manual",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/fulfillment",
          },
          "inventory": {
            "resolve": "@vikrai/vikrai/inventory",
          },
          "locking": {
            "resolve": "@vikrai/vikrai/locking",
          },
          "notification": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "options": {
                    "channels": [
                      "feed",
                    ],
                    "name": "Local Notification Provider",
                  },
                  "resolve": "@vikrai/vikrai/notification-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/notification",
          },
          "order": {
            "resolve": "@vikrai/vikrai/order",
          },
          "payment": {
            "resolve": "@vikrai/vikrai/payment",
          },
          "pricing": {
            "resolve": "@vikrai/vikrai/pricing",
          },
          "product": {
            "resolve": "@vikrai/vikrai/product",
          },
          "promotion": {
            "resolve": "@vikrai/vikrai/promotion",
          },
          "region": {
            "resolve": "@vikrai/vikrai/region",
          },
          "sales_channel": {
            "resolve": "@vikrai/vikrai/sales-channel",
          },
          "stock_location": {
            "resolve": "@vikrai/vikrai/stock-location",
          },
          "store": {
            "resolve": "@vikrai/vikrai/store",
          },
          "tax": {
            "resolve": "@vikrai/vikrai/tax",
          },
          "user": {
            "options": {
              "jwt_secret": "supersecret",
            },
            "resolve": "@vikrai/vikrai/user",
          },
          "workflows": {
            "resolve": "@vikrai/vikrai/workflow-engine-inmemory",
          },
        },
        "plugins": [],
        "projectConfig": {
          "databaseUrl": "postgres://localhost/vikrai-starter-default",
          "http": {
            "adminCors": "http://localhost:3000",
            "authCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "cookieSecret": "supersecret",
            "jwtSecret": "supersecret",
            "restrictedFields": {
              "store": [
                ${DEFAULT_STORE_RESTRICTED_FIELDS.map((v) => `"${v}"`).join(
                  ",\n                "
                )},
              ],
            },
            "storeCors": "http://localhost:8000",
          },
          "redisOptions": {
            "retryStrategy": [Function],
          },
          "sessionOptions": {},
        },
      }
    `)
  })

  it("should include disabled modules", function () {
    expect(
      defineConfig({
        projectConfig: {
          http: {
            adminCors: "http://localhost:3000",
          } as any,
        },
        modules: {
          [Modules.CART]: false,
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "admin": {
          "backendUrl": "/",
          "path": "/app",
        },
        "featureFlags": {},
        "modules": {
          "api_key": {
            "resolve": "@vikrai/vikrai/api-key",
          },
          "auth": {
            "options": {
              "providers": [
                {
                  "id": "emailpass",
                  "resolve": "@vikrai/vikrai/auth-emailpass",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/auth",
          },
          "cache": {
            "resolve": "@vikrai/vikrai/cache-inmemory",
          },
          "cart": {
            "disable": true,
          },
          "currency": {
            "resolve": "@vikrai/vikrai/currency",
          },
          "customer": {
            "resolve": "@vikrai/vikrai/customer",
          },
          "event_bus": {
            "resolve": "@vikrai/vikrai/event-bus-local",
          },
          "file": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "resolve": "@vikrai/vikrai/file-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/file",
          },
          "fulfillment": {
            "options": {
              "providers": [
                {
                  "id": "manual",
                  "resolve": "@vikrai/vikrai/fulfillment-manual",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/fulfillment",
          },
          "inventory": {
            "resolve": "@vikrai/vikrai/inventory",
          },
          "locking": {
            "resolve": "@vikrai/vikrai/locking",
          },
          "notification": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "options": {
                    "channels": [
                      "feed",
                    ],
                    "name": "Local Notification Provider",
                  },
                  "resolve": "@vikrai/vikrai/notification-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/notification",
          },
          "order": {
            "resolve": "@vikrai/vikrai/order",
          },
          "payment": {
            "resolve": "@vikrai/vikrai/payment",
          },
          "pricing": {
            "resolve": "@vikrai/vikrai/pricing",
          },
          "product": {
            "resolve": "@vikrai/vikrai/product",
          },
          "promotion": {
            "resolve": "@vikrai/vikrai/promotion",
          },
          "region": {
            "resolve": "@vikrai/vikrai/region",
          },
          "sales_channel": {
            "resolve": "@vikrai/vikrai/sales-channel",
          },
          "stock_location": {
            "resolve": "@vikrai/vikrai/stock-location",
          },
          "store": {
            "resolve": "@vikrai/vikrai/store",
          },
          "tax": {
            "resolve": "@vikrai/vikrai/tax",
          },
          "user": {
            "options": {
              "jwt_secret": "supersecret",
            },
            "resolve": "@vikrai/vikrai/user",
          },
          "workflows": {
            "resolve": "@vikrai/vikrai/workflow-engine-inmemory",
          },
        },
        "plugins": [],
        "projectConfig": {
          "databaseUrl": "postgres://localhost/vikrai-starter-default",
          "http": {
            "adminCors": "http://localhost:3000",
            "authCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "cookieSecret": "supersecret",
            "jwtSecret": "supersecret",
            "restrictedFields": {
              "store": [
                ${DEFAULT_STORE_RESTRICTED_FIELDS.map((v) => `"${v}"`).join(
                  ",\n                "
                )},
              ],
            },
            "storeCors": "http://localhost:8000",
          },
          "redisOptions": {
            "retryStrategy": [Function],
          },
          "sessionOptions": {},
        },
      }
    `)
  })

  it("should include cloud-based modules when in cloud execution context", function () {
    const originalEnv = { ...process.env }

    process.env.EXECUTION_CONTEXT = "vikrai-cloud"
    process.env.REDIS_URL = "redis://localhost:6379"
    process.env.S3_FILE_URL = "https://s3.amazonaws.com/vikrai-cloud-test"
    process.env.S3_PREFIX = "test"
    process.env.S3_REGION = "us-east-1"
    process.env.S3_BUCKET = "vikrai-cloud-test"
    process.env.S3_ENDPOINT = "https://s3.amazonaws.com"
    const res = defineConfig({})

    process.env = { ...originalEnv }

    expect(res).toMatchInlineSnapshot(`
      {
        "admin": {
          "backendUrl": "/",
          "path": "/app",
        },
        "featureFlags": {},
        "modules": {
          "api_key": {
            "resolve": "@vikrai/vikrai/api-key",
          },
          "auth": {
            "options": {
              "providers": [
                {
                  "id": "emailpass",
                  "resolve": "@vikrai/vikrai/auth-emailpass",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/auth",
          },
          "cache": {
            "options": {
              "redisUrl": "redis://localhost:6379",
            },
            "resolve": "@vikrai/vikrai/cache-redis",
          },
          "cart": {
            "resolve": "@vikrai/vikrai/cart",
          },
          "currency": {
            "resolve": "@vikrai/vikrai/currency",
          },
          "customer": {
            "resolve": "@vikrai/vikrai/customer",
          },
          "event_bus": {
            "options": {
              "redisUrl": "redis://localhost:6379",
            },
            "resolve": "@vikrai/vikrai/event-bus-redis",
          },
          "file": {
            "options": {
              "providers": [
                {
                  "id": "s3",
                  "options": {
                    "authentication_method": "s3-iam-role",
                    "bucket": "vikrai-cloud-test",
                    "endpoint": "https://s3.amazonaws.com",
                    "file_url": "https://s3.amazonaws.com/vikrai-cloud-test",
                    "prefix": "test",
                    "region": "us-east-1",
                  },
                  "resolve": "@vikrai/vikrai/file-s3",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/file",
          },
          "fulfillment": {
            "options": {
              "providers": [
                {
                  "id": "manual",
                  "resolve": "@vikrai/vikrai/fulfillment-manual",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/fulfillment",
          },
          "inventory": {
            "resolve": "@vikrai/vikrai/inventory",
          },
          "locking": {
            "options": {
              "providers": [
                {
                  "id": "locking-redis",
                  "is_default": true,
                  "options": {
                    "redisUrl": "redis://localhost:6379",
                  },
                  "resolve": "@vikrai/vikrai/locking-redis",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/locking",
          },
          "notification": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "options": {
                    "channels": [
                      "feed",
                    ],
                    "name": "Local Notification Provider",
                  },
                  "resolve": "@vikrai/vikrai/notification-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/notification",
          },
          "order": {
            "resolve": "@vikrai/vikrai/order",
          },
          "payment": {
            "resolve": "@vikrai/vikrai/payment",
          },
          "pricing": {
            "resolve": "@vikrai/vikrai/pricing",
          },
          "product": {
            "resolve": "@vikrai/vikrai/product",
          },
          "promotion": {
            "resolve": "@vikrai/vikrai/promotion",
          },
          "region": {
            "resolve": "@vikrai/vikrai/region",
          },
          "sales_channel": {
            "resolve": "@vikrai/vikrai/sales-channel",
          },
          "stock_location": {
            "resolve": "@vikrai/vikrai/stock-location",
          },
          "store": {
            "resolve": "@vikrai/vikrai/store",
          },
          "tax": {
            "resolve": "@vikrai/vikrai/tax",
          },
          "user": {
            "options": {
              "jwt_secret": "supersecret",
            },
            "resolve": "@vikrai/vikrai/user",
          },
          "workflows": {
            "options": {
              "redis": {
                "url": "redis://localhost:6379",
              },
            },
            "resolve": "@vikrai/vikrai/workflow-engine-redis",
          },
        },
        "plugins": [],
        "projectConfig": {
          "databaseUrl": "postgres://localhost/vikrai-starter-default",
          "http": {
            "adminCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "authCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "cookieSecret": "supersecret",
            "jwtSecret": "supersecret",
            "restrictedFields": {
              "store": [
                ${DEFAULT_STORE_RESTRICTED_FIELDS.map((v) => `"${v}"`).join(
                  ",\n                "
                )},
              ],
            },
            "storeCors": "http://localhost:8000",
          },
          "redisOptions": {
            "retryStrategy": [Function],
          },
          "redisUrl": "redis://localhost:6379",
          "sessionOptions": {},
        },
      }
    `)
  })

  it("should include cloud-based config with dynamo db", function () {
    const originalEnv = { ...process.env }

    process.env.EXECUTION_CONTEXT = "vikrai-cloud"
    process.env.REDIS_URL = "redis://localhost:6379"
    process.env.S3_FILE_URL = "https://s3.amazonaws.com/vikrai-cloud-test"
    process.env.S3_PREFIX = "test"
    process.env.S3_REGION = "us-east-1"
    process.env.S3_BUCKET = "vikrai-cloud-test"
    process.env.S3_ENDPOINT = "https://s3.amazonaws.com"
    process.env.SESSION_STORE = "dynamodb"
    const res = defineConfig({})

    process.env = { ...originalEnv }

    expect(res).toMatchInlineSnapshot(`
      {
        "admin": {
          "backendUrl": "/",
          "path": "/app",
        },
        "featureFlags": {},
        "modules": {
          "api_key": {
            "resolve": "@vikrai/vikrai/api-key",
          },
          "auth": {
            "options": {
              "providers": [
                {
                  "id": "emailpass",
                  "resolve": "@vikrai/vikrai/auth-emailpass",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/auth",
          },
          "cache": {
            "options": {
              "redisUrl": "redis://localhost:6379",
            },
            "resolve": "@vikrai/vikrai/cache-redis",
          },
          "cart": {
            "resolve": "@vikrai/vikrai/cart",
          },
          "currency": {
            "resolve": "@vikrai/vikrai/currency",
          },
          "customer": {
            "resolve": "@vikrai/vikrai/customer",
          },
          "event_bus": {
            "options": {
              "redisUrl": "redis://localhost:6379",
            },
            "resolve": "@vikrai/vikrai/event-bus-redis",
          },
          "file": {
            "options": {
              "providers": [
                {
                  "id": "s3",
                  "options": {
                    "authentication_method": "s3-iam-role",
                    "bucket": "vikrai-cloud-test",
                    "endpoint": "https://s3.amazonaws.com",
                    "file_url": "https://s3.amazonaws.com/vikrai-cloud-test",
                    "prefix": "test",
                    "region": "us-east-1",
                  },
                  "resolve": "@vikrai/vikrai/file-s3",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/file",
          },
          "fulfillment": {
            "options": {
              "providers": [
                {
                  "id": "manual",
                  "resolve": "@vikrai/vikrai/fulfillment-manual",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/fulfillment",
          },
          "inventory": {
            "resolve": "@vikrai/vikrai/inventory",
          },
          "locking": {
            "options": {
              "providers": [
                {
                  "id": "locking-redis",
                  "is_default": true,
                  "options": {
                    "redisUrl": "redis://localhost:6379",
                  },
                  "resolve": "@vikrai/vikrai/locking-redis",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/locking",
          },
          "notification": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "options": {
                    "channels": [
                      "feed",
                    ],
                    "name": "Local Notification Provider",
                  },
                  "resolve": "@vikrai/vikrai/notification-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/notification",
          },
          "order": {
            "resolve": "@vikrai/vikrai/order",
          },
          "payment": {
            "resolve": "@vikrai/vikrai/payment",
          },
          "pricing": {
            "resolve": "@vikrai/vikrai/pricing",
          },
          "product": {
            "resolve": "@vikrai/vikrai/product",
          },
          "promotion": {
            "resolve": "@vikrai/vikrai/promotion",
          },
          "region": {
            "resolve": "@vikrai/vikrai/region",
          },
          "sales_channel": {
            "resolve": "@vikrai/vikrai/sales-channel",
          },
          "stock_location": {
            "resolve": "@vikrai/vikrai/stock-location",
          },
          "store": {
            "resolve": "@vikrai/vikrai/store",
          },
          "tax": {
            "resolve": "@vikrai/vikrai/tax",
          },
          "user": {
            "options": {
              "jwt_secret": "supersecret",
            },
            "resolve": "@vikrai/vikrai/user",
          },
          "workflows": {
            "options": {
              "redis": {
                "url": "redis://localhost:6379",
              },
            },
            "resolve": "@vikrai/vikrai/workflow-engine-redis",
          },
        },
        "plugins": [],
        "projectConfig": {
          "databaseUrl": "postgres://localhost/vikrai-starter-default",
          "http": {
            "adminCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "authCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "cookieSecret": "supersecret",
            "jwtSecret": "supersecret",
            "restrictedFields": {
              "store": [
                ${DEFAULT_STORE_RESTRICTED_FIELDS.map((v) => `"${v}"`).join(
                  ",\n                "
                )},
              ],
            },
            "storeCors": "http://localhost:8000",
          },
          "redisOptions": {
            "retryStrategy": [Function],
          },
          "redisUrl": "redis://localhost:6379",
          "sessionOptions": {
            "dynamodbOptions": {
              "hashKey": "id",
              "initialized": true,
              "prefix": "sess:",
              "readCapacityUnits": 5,
              "skipThrowMissingSpecialKeys": true,
              "table": "vikrai-sessions",
              "writeCapacityUnits": 5,
            },
          },
        },
      }
    `)
  })

  it("should allow overriding cloud-only dynamodb config values via environment variables", function () {
    const originalEnv = { ...process.env }

    process.env.EXECUTION_CONTEXT = "vikrai-cloud"
    process.env.REDIS_URL = "redis://localhost:6379"
    process.env.S3_FILE_URL = "https://s3.amazonaws.com/vikrai-cloud-test"
    process.env.S3_PREFIX = "test"
    process.env.S3_REGION = "us-east-1"
    process.env.S3_BUCKET = "vikrai-cloud-test"
    process.env.S3_ENDPOINT = "https://s3.amazonaws.com"
    process.env.SESSION_STORE = "dynamodb"
    process.env.DYNAMO_DB_SESSIONS_CREATE_TABLE = "true"
    process.env.DYNAMO_DB_SESSIONS_HASH_KEY = "user_id"
    process.env.DYNAMO_DB_SESSIONS_PREFIX = "my_session:"
    process.env.DYNAMO_DB_SESSIONS_TABLE = "test-sessions"
    process.env.DYNAMO_DB_SESSIONS_READ_UNITS = "10"
    process.env.DYNAMO_DB_SESSIONS_WRITE_UNITS = "10"
    const res = defineConfig({})

    process.env = { ...originalEnv }

    expect(res).toMatchInlineSnapshot(`
      {
        "admin": {
          "backendUrl": "/",
          "path": "/app",
        },
        "featureFlags": {},
        "modules": {
          "api_key": {
            "resolve": "@vikrai/vikrai/api-key",
          },
          "auth": {
            "options": {
              "providers": [
                {
                  "id": "emailpass",
                  "resolve": "@vikrai/vikrai/auth-emailpass",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/auth",
          },
          "cache": {
            "options": {
              "redisUrl": "redis://localhost:6379",
            },
            "resolve": "@vikrai/vikrai/cache-redis",
          },
          "cart": {
            "resolve": "@vikrai/vikrai/cart",
          },
          "currency": {
            "resolve": "@vikrai/vikrai/currency",
          },
          "customer": {
            "resolve": "@vikrai/vikrai/customer",
          },
          "event_bus": {
            "options": {
              "redisUrl": "redis://localhost:6379",
            },
            "resolve": "@vikrai/vikrai/event-bus-redis",
          },
          "file": {
            "options": {
              "providers": [
                {
                  "id": "s3",
                  "options": {
                    "authentication_method": "s3-iam-role",
                    "bucket": "vikrai-cloud-test",
                    "endpoint": "https://s3.amazonaws.com",
                    "file_url": "https://s3.amazonaws.com/vikrai-cloud-test",
                    "prefix": "test",
                    "region": "us-east-1",
                  },
                  "resolve": "@vikrai/vikrai/file-s3",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/file",
          },
          "fulfillment": {
            "options": {
              "providers": [
                {
                  "id": "manual",
                  "resolve": "@vikrai/vikrai/fulfillment-manual",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/fulfillment",
          },
          "inventory": {
            "resolve": "@vikrai/vikrai/inventory",
          },
          "locking": {
            "options": {
              "providers": [
                {
                  "id": "locking-redis",
                  "is_default": true,
                  "options": {
                    "redisUrl": "redis://localhost:6379",
                  },
                  "resolve": "@vikrai/vikrai/locking-redis",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/locking",
          },
          "notification": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "options": {
                    "channels": [
                      "feed",
                    ],
                    "name": "Local Notification Provider",
                  },
                  "resolve": "@vikrai/vikrai/notification-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/notification",
          },
          "order": {
            "resolve": "@vikrai/vikrai/order",
          },
          "payment": {
            "resolve": "@vikrai/vikrai/payment",
          },
          "pricing": {
            "resolve": "@vikrai/vikrai/pricing",
          },
          "product": {
            "resolve": "@vikrai/vikrai/product",
          },
          "promotion": {
            "resolve": "@vikrai/vikrai/promotion",
          },
          "region": {
            "resolve": "@vikrai/vikrai/region",
          },
          "sales_channel": {
            "resolve": "@vikrai/vikrai/sales-channel",
          },
          "stock_location": {
            "resolve": "@vikrai/vikrai/stock-location",
          },
          "store": {
            "resolve": "@vikrai/vikrai/store",
          },
          "tax": {
            "resolve": "@vikrai/vikrai/tax",
          },
          "user": {
            "options": {
              "jwt_secret": "supersecret",
            },
            "resolve": "@vikrai/vikrai/user",
          },
          "workflows": {
            "options": {
              "redis": {
                "url": "redis://localhost:6379",
              },
            },
            "resolve": "@vikrai/vikrai/workflow-engine-redis",
          },
        },
        "plugins": [],
        "projectConfig": {
          "databaseUrl": "postgres://localhost/vikrai-starter-default",
          "http": {
            "adminCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "authCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "cookieSecret": "supersecret",
            "jwtSecret": "supersecret",
            "restrictedFields": {
              "store": [
                ${DEFAULT_STORE_RESTRICTED_FIELDS.map((v) => `"${v}"`).join(
                  ",\n                "
                )},
              ],
            },
            "storeCors": "http://localhost:8000",
          },
          "redisOptions": {
            "retryStrategy": [Function],
          },
          "redisUrl": "redis://localhost:6379",
          "sessionOptions": {
            "dynamodbOptions": {
              "hashKey": "user_id",
              "initialized": false,
              "prefix": "my_session:",
              "readCapacityUnits": 10,
              "skipThrowMissingSpecialKeys": true,
              "table": "test-sessions",
              "writeCapacityUnits": 10,
            },
          },
        },
      }
    `)
  })

  it("should allow custom dynamodb config", function () {
    expect(
      defineConfig({
        projectConfig: {
          http: {
            adminCors: "http://localhost:3000",
          } as any,
          sessionOptions: {
            dynamodbOptions: {
              clientOptions: {
                endpoint: "http://localhost:8000",
              },
              table: "vikrai-sessions",
              writeCapacityUnits: 25,
              readCapacityUnits: 25,
            },
          },
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "admin": {
          "backendUrl": "/",
          "path": "/app",
        },
        "featureFlags": {},
        "modules": {
          "api_key": {
            "resolve": "@vikrai/vikrai/api-key",
          },
          "auth": {
            "options": {
              "providers": [
                {
                  "id": "emailpass",
                  "resolve": "@vikrai/vikrai/auth-emailpass",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/auth",
          },
          "cache": {
            "resolve": "@vikrai/vikrai/cache-inmemory",
          },
          "cart": {
            "resolve": "@vikrai/vikrai/cart",
          },
          "currency": {
            "resolve": "@vikrai/vikrai/currency",
          },
          "customer": {
            "resolve": "@vikrai/vikrai/customer",
          },
          "event_bus": {
            "resolve": "@vikrai/vikrai/event-bus-local",
          },
          "file": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "resolve": "@vikrai/vikrai/file-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/file",
          },
          "fulfillment": {
            "options": {
              "providers": [
                {
                  "id": "manual",
                  "resolve": "@vikrai/vikrai/fulfillment-manual",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/fulfillment",
          },
          "inventory": {
            "resolve": "@vikrai/vikrai/inventory",
          },
          "locking": {
            "resolve": "@vikrai/vikrai/locking",
          },
          "notification": {
            "options": {
              "providers": [
                {
                  "id": "local",
                  "options": {
                    "channels": [
                      "feed",
                    ],
                    "name": "Local Notification Provider",
                  },
                  "resolve": "@vikrai/vikrai/notification-local",
                },
              ],
            },
            "resolve": "@vikrai/vikrai/notification",
          },
          "order": {
            "resolve": "@vikrai/vikrai/order",
          },
          "payment": {
            "resolve": "@vikrai/vikrai/payment",
          },
          "pricing": {
            "resolve": "@vikrai/vikrai/pricing",
          },
          "product": {
            "resolve": "@vikrai/vikrai/product",
          },
          "promotion": {
            "resolve": "@vikrai/vikrai/promotion",
          },
          "region": {
            "resolve": "@vikrai/vikrai/region",
          },
          "sales_channel": {
            "resolve": "@vikrai/vikrai/sales-channel",
          },
          "stock_location": {
            "resolve": "@vikrai/vikrai/stock-location",
          },
          "store": {
            "resolve": "@vikrai/vikrai/store",
          },
          "tax": {
            "resolve": "@vikrai/vikrai/tax",
          },
          "user": {
            "options": {
              "jwt_secret": "supersecret",
            },
            "resolve": "@vikrai/vikrai/user",
          },
          "workflows": {
            "resolve": "@vikrai/vikrai/workflow-engine-inmemory",
          },
        },
        "plugins": [],
        "projectConfig": {
          "databaseUrl": "postgres://localhost/vikrai-starter-default",
          "http": {
            "adminCors": "http://localhost:3000",
            "authCors": "http://localhost:7000,http://localhost:7001,http://localhost:5173",
            "cookieSecret": "supersecret",
            "jwtSecret": "supersecret",
            "restrictedFields": {
              "store": [
                ${DEFAULT_STORE_RESTRICTED_FIELDS.map((v) => `"${v}"`).join(
                  ",\n                "
                )},
              ],
            },
            "storeCors": "http://localhost:8000",
          },
          "redisOptions": {
            "retryStrategy": [Function],
          },
          "sessionOptions": {
            "dynamodbOptions": {
              "clientOptions": {
                "endpoint": "http://localhost:8000",
              },
              "readCapacityUnits": 25,
              "table": "vikrai-sessions",
              "writeCapacityUnits": 25,
            },
          },
        },
      }
    `)
  })
})

