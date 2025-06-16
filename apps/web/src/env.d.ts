/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MUDITA_CENTER_SERVER_URL: string
  readonly VITE_ANALYTICS_ENABLED: string
  readonly VITE_ANALYTICS_API_URL: string
  readonly VITE_ANALYTICS_API_SITE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
