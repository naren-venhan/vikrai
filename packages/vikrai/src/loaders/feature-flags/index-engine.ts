import { FlagSettings } from "@vikrai/framework/feature-flags"

const IndexEngineFeatureFlag: FlagSettings = {
  key: "index_engine",
  default_val: false,
  env_key: "vikrai_FF_INDEX_ENGINE",
  description: "Enable vikrai to use the index engine in some part of the core",
}

export default IndexEngineFeatureFlag

