import { AppSettings as StoreValues } from "App/main/default-app-settings"

interface StoreEffects {
  loadSettings: () => void
  setAutostart: (option: boolean) => void
  setTethering: (option: boolean) => void
}

export type Store = StoreValues & StoreEffects
