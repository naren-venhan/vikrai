import { DashboardApp } from "./dashboard-app"
import { DashboardPlugin } from "./dashboard-app/types"

import displayModule from "virtual:vikrai/displays"
import formModule from "virtual:vikrai/forms"
import menuItemModule from "virtual:vikrai/menu-items"
import routeModule from "virtual:vikrai/routes"
import widgetModule from "virtual:vikrai/widgets"

import "./index.css"

const localPlugin = {
  widgetModule,
  routeModule,
  displayModule,
  formModule,
  menuItemModule,
}

interface AppProps {
  plugins?: DashboardPlugin[]
}

function App({ plugins = [] }: AppProps) {
  const app = new DashboardApp({
    plugins: [localPlugin, ...plugins],
  })

  return <div>{app.render()}</div>
}

export default App

