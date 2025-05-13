import { FeatureFlagTypes } from "@vikrai/types"

export const WorkflowsFeatureFlag: FeatureFlagTypes.FlagSettings = {
  key: "workflows",
  default_val: false,
  env_key: "vikrai_FF_WORKFLOWS",
  description: "[WIP] Enable workflows",
}

