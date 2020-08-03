import AppSettingsAdapter from "Backend/adapters/app-settings/app-settings-adapter.class"
import {
  AppSettings as AppSettingsInterface,
  SettingsUpdateOption,
} from "App/main/store/settings.interface"
import Store from "electron-store"
import settingsStore from "App/main/store/settings"
import settingsSchema from "App/main/store/settings.schema"

class AppSettings extends AppSettingsAdapter {
  private readonly store: Store<AppSettingsInterface>

  constructor() {
    super()
    this.store = settingsStore
  }

  getAppSettings(): AppSettingsInterface {
    return this.store.store
  }

  resetAppSettings(): AppSettingsInterface {
    this.store.reset(...Object.keys(settingsSchema))
    return this.store.store
  }

  updateAppSettings({
    key,
    value,
  }: SettingsUpdateOption): Partial<AppSettingsInterface> {
    this.store.set(key, value)
    return this.store.get(key)
  }
}

const createAppSettingsAdapter = (): AppSettingsAdapter => new AppSettings()

export default createAppSettingsAdapter
