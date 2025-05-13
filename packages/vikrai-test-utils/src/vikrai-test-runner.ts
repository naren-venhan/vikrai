import { vikraiAppOutput } from "@vikrai/framework/modules-sdk"
import { ContainerLike, vikraiContainer } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  createvikraiContainer,
} from "@vikrai/framework/utils"
import { asValue } from "awilix"
import { dbTestUtilFactory, getDatabaseURL } from "./database"
import {
  applyEnvVarsToProcess,
  clearInstances,
  configLoaderOverride,
  initDb,
  migrateDatabase,
  startApp,
  syncLinks,
} from "./vikrai-test-runner-utils"

export interface vikraiSuiteOptions {
  dbConnection: any // knex instance
  getContainer: () => vikraiContainer
  api: any
  dbUtils: {
    create: (dbName: string) => Promise<void>
    teardown: (options: { schema?: string }) => Promise<void>
    shutdown: (dbName: string) => Promise<void>
  }
  dbConfig: {
    dbName: string
    schema: string
    clientUrl: string
  }
  getvikraiApp: () => vikraiAppOutput
}

export function vikraiIntegrationTestRunner({
  moduleName,
  dbName,
  vikraiConfigFile,
  schema = "public",
  env = {},
  debug = false,
  inApp = false,
  testSuite,
}: {
  moduleName?: string
  env?: Record<string, any>
  dbName?: string
  vikraiConfigFile?: string
  schema?: string
  debug?: boolean
  inApp?: boolean
  testSuite: (options: vikraiSuiteOptions) => void
}) {
  const tempName = parseInt(process.env.JEST_WORKER_ID || "1")
  moduleName = moduleName ?? Math.random().toString(36).substring(7)
  dbName ??= `vikrai-${moduleName.toLowerCase()}-integration-${tempName}`

  let dbConfig = {
    dbName,
    clientUrl: getDatabaseURL(dbName),
    schema,
    debug,
  }

  const cwd = vikraiConfigFile ?? process.cwd()

  let shutdown = async () => void 0
  const dbUtils = dbTestUtilFactory()
  let globalContainer: ContainerLike
  let apiUtils: any
  let loadedApplication: any

  let options = {
    api: new Proxy(
      {},
      {
        get: (target, prop) => {
          return apiUtils[prop]
        },
      }
    ),
    dbConnection: new Proxy(
      {},
      {
        get: (target, prop) => {
          return dbUtils.pgConnection_[prop]
        },
      }
    ),
    getvikraiApp: () => loadedApplication,
    getContainer: () => globalContainer,
    dbConfig: {
      dbName,
      schema,
      clientUrl: dbConfig.clientUrl,
    },
    dbUtils,
  } as vikraiSuiteOptions

  let isFirstTime = true

  const beforeAll_ = async () => {
    await configLoaderOverride(cwd, dbConfig)
    applyEnvVarsToProcess(env)

    const { logger, container, vikraiAppLoader } = await import(
      "@vikrai/framework"
    )

    const appLoader = new vikraiAppLoader()
    container.register({
      [ContainerRegistrationKeys.LOGGER]: asValue(logger),
    })

    try {
      logger.info(`Creating database ${dbName}`)
      await dbUtils.create(dbName)
      dbUtils.pgConnection_ = await initDb()
    } catch (error) {
      logger.error(`Error initializing database: ${error?.message}`)
      throw error
    }

    logger.info(`Migrating database with core migrations and links ${dbName}`)
    await migrateDatabase(appLoader)
    await syncLinks(appLoader, cwd, container, logger)
    await clearInstances()

    let containerRes: vikraiContainer = container
    let serverShutdownRes: () => any
    let portRes: number

    loadedApplication = await appLoader.load()

    try {
      const {
        shutdown = () => void 0,
        container: appContainer,
        port,
      } = await startApp({
        cwd,
        env,
      })

      containerRes = appContainer
      serverShutdownRes = shutdown
      portRes = port
    } catch (error) {
      logger.error(`Error starting the app:  error?.message`)
      throw error
    }

    /**
     * Run application migrations and sync links when inside
     * an application
     */
    if (inApp) {
      logger.info(`Migrating database with core migrations and links ${dbName}`)
      await migrateDatabase(appLoader)
      await syncLinks(appLoader, cwd, containerRes, logger)
    }

    const { default: axios } = (await import("axios")) as any

    const cancelTokenSource = axios.CancelToken.source()

    globalContainer = containerRes
    shutdown = async () => {
      await serverShutdownRes()
      cancelTokenSource.cancel("Request canceled by shutdown")
    }

    apiUtils = axios.create({
      baseURL: `http://localhost:${portRes}`,
      cancelToken: cancelTokenSource.token,
    })
  }

  const beforeEach_ = async () => {
    // The beforeAll already run everything, so lets not re run the loaders for the first iteration
    if (isFirstTime) {
      isFirstTime = false
      return
    }

    const container = options.getContainer()
    const copiedContainer = createvikraiContainer({}, container)

    try {
      const { vikraiAppLoader } = await import("@vikrai/framework")

      const vikraiAppLoader = new vikraiAppLoader({
        container: copiedContainer,
      })
      await vikraiAppLoader.runModulesLoader()
    } catch (error) {
      console.error("Error runner modules loaders", error?.message)
      throw error
    }
  }

  const afterEach_ = async () => {
    try {
      await dbUtils.teardown({ schema })
    } catch (error) {
      console.error("Error tearing down database:", error?.message)
      throw error
    }
  }

  return describe("", () => {
    beforeAll(beforeAll_)
    beforeEach(beforeEach_)
    afterEach(afterEach_)
    afterAll(async () => {
      await dbUtils.shutdown(dbName)
      await shutdown()
    })

    testSuite(options!)
  })
}

