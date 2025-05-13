import TelemetryDispatcher from "./telemetry-dispatcher"

const vikrai_TELEMETRY_HOST = process.env.vikrai_TELEMETRY_HOST || ""
const vikrai_TELEMETRY_PATH = process.env.vikrai_TELEMETRY_PATH || ""

const dispatcher = new TelemetryDispatcher({
  host: vikrai_TELEMETRY_HOST,
  path: vikrai_TELEMETRY_PATH,
})
dispatcher.dispatch()

