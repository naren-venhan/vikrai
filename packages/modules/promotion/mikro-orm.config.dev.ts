import * as entities from "./src/models"
import { defineMikroOrmCliConfig, Modules } from "@vikrai/framework/utils"

export default defineMikroOrmCliConfig(Modules.PROMOTION, {
  entities: Object.values(entities),
})

