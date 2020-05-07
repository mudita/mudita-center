import { AppSettings as StoreValues } from "App/main/default-app-settings"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"

interface StoreEffects {
  loadSettings: () => void
  setAutostart: (option: Option) => void
  setTethering: (option: Option) => void
}

export type Store = StoreValues & StoreEffects
