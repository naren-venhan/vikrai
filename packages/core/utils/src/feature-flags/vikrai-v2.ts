import { FeatureFlagTypes } from "@vikrai/types"

export const vikraiV2Flag: FeatureFlagTypes.FlagSettings = {
  key: "vikrai_v2",
  default_val: false,
  env_key: "vikrai_FF_vikrai_V2",
  description: "[WIP] Enable vikrai V2",
}

