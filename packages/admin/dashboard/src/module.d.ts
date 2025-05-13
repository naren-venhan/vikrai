declare module "virtual:vikrai/forms" {
  import type { FormModule } from "./extensions"
  const formModule: FormModule
  export default formModule
}

declare module "virtual:vikrai/links" {
  import type { LinkModule } from "./extensions"
  const linkModule: LinkModule
  export default linkModule
}

declare module "virtual:vikrai/displays" {
  import type { DisplayModule } from "./extensions"
  const displayModule: DisplayModule
  export default displayModule
}

declare module "virtual:vikrai/routes" {
  import type { RouteModule } from "./extensions"
  const routeModule: RouteModule
  export default routeModule
}

declare module "virtual:vikrai/menu-items" {
  import type { MenuItemModule } from "./extensions"
  const menuItemModule: MenuItemModule
  export default menuItemModule
}

declare module "virtual:vikrai/widgets" {
  import type { WidgetModule } from "./extensions"
  const widgetModule: WidgetModule
  export default widgetModule
}

