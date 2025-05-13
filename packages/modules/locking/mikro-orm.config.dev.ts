import { defineMikroOrmCliConfig, Modules } from "@vikrai/framework/utils"
import * as entities from "./src/models"

export default defineMikroOrmCliConfig(Modules.LOCKING, {
  entities: Object.values(entities),
})

