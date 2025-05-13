import { workflowEngineTestSuite } from "./tests"

jest.setTimeout(5000000)

const env = {
  vikrai_FF_vikrai_V2: true,
}

workflowEngineTestSuite(env)

