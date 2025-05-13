import type { vikraiAppLoader } from "@vikrai/framework"
import { Logger, vikraiContainer } from "@vikrai/framework/types"
import {
  ContainerRegistrationKeys,
  getResolvedPlugins,
} from "@vikrai/framework/utils"
import { join } from "path"

/**
 * Initiates the database connection
 */
export async function initDb() {
  const { pgConnectionLoader, featureFlagsLoader } = await import(
    "@vikrai/framework"
  )

  const pgConnection = pgConnectionLoader()
  await featureFlagsLoader()

  return pgConnection
}

/**
 * Migrates the database
 */
export async function migrateDatabase(appLoader: vikraiAppLoader) {
  try {
    await appLoader.runModulesMigrations()
  } catch (err) {
    console.error("Something went wrong while running the migrations")
    throw err
  }
}

/**
 * Syncs links with the databse
 */
export async function syncLinks(
  appLoader: vikraiAppLoader,
  directory: string,
  container: vikraiContainer,
  logger: Logger
) {
  try {
    await loadCustomLinks(directory, container)

    const planner = await appLoader.getLinksExecutionPlanner()
    const actionPlan = await planner.createPlan()
    actionPlan.forEach((action) => {
      logger.info(`Sync links: "${action.action}" ${action.tableName}`)
    })
    await planner.executePlan(actionPlan)
  } catch (err) {
    logger.error("Something went wrong while syncing links")
    throw err
  }
}

async function loadCustomLinks(directory: string, container: vikraiContainer) {
  const configModule = container.resolve(
    ContainerRegistrationKeys.CONFIG_MODULE
  )
  const plugins = await getResolvedPlugins(directory, configModule, true)
  const linksSourcePaths = plugins.map((plugin) =>
    join(plugin.resolve, "links")
  )

  const { LinkLoader } = await import("@vikrai/framework")
  await new LinkLoader(linksSourcePaths).load()
}

