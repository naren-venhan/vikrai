import { ModuleExports } from "@vikrai/types"
import { ModuleService } from "./services/module-service"
import { Module } from "@vikrai/utils"

const moduleExports: ModuleExports = {
  service: ModuleService,
}

export * from "./services/module-service"

export default Module("module-with-providers", moduleExports)

