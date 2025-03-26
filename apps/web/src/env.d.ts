/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MUDITA_CENTER_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
