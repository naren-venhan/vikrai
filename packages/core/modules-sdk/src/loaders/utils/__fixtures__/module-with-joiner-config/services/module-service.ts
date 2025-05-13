import { IModuleService, ModuleJoinerConfig } from "@vikrai/types"
import { defineJoinerConfig } from "@vikrai/utils"

export class ModuleService implements IModuleService {
  __joinerConfig(): ModuleJoinerConfig {
    return defineJoinerConfig("module-service", {
      alias: [
        {
          name: ["custom_name"],
          entity: "Custom",
        },
      ],
    })
  }
}

