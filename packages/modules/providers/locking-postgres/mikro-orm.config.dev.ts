import * as entities from "./src/models"

import { defineMikroOrmCliConfig } from "@vikrai/framework/utils"

export default defineMikroOrmCliConfig("lockingPostgres", {
  entities: Object.values(entities),
})

