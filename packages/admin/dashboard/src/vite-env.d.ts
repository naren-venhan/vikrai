// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_vikrai_ADMIN_BACKEND_URL: string
  readonly VITE_vikrai_STOREFRONT_URL: string
  readonly VITE_vikrai_V2: "true" | "false"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly hot: {
    accept: () => void
  }
}

declare const __BACKEND_URL__: string | undefined
declare const __STOREFRONT_URL__: string | undefined
declare const __BASE__: string

