import { Dispatch } from "Renderer/store"
import {
  getAppSettings,
  updateAppSettings,
} from "Renderer/requests/app-settings.request"
import {
  AppSettings,
  SettingsUpdateOption,
} from "App/main/store/settings.interface"
import { ipcRenderer } from "electron-better-ipc"
import { SettingsActions } from "Common/enums/settings-actions.enum"

export default {
  state: {},
  reducers: {
    update(state: AppSettings, payload: Partial<AppSettings>) {
      return { ...state, ...payload }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async loadSettings() {
      dispatch.settings.update(await getAppSettings())
    },
    async updateSettings(option: SettingsUpdateOption) {
      updateAppSettings(option)
      dispatch.settings.update({ [option.key]: option.value })
    },
    async checkAutostartValue() {
      const value = await ipcRenderer.callMain(
        SettingsActions.GetAutostartValue
      )
      this.updateSettings({ key: "appAutostart", value })
      return value
    },
    setAutostart(value: AppSettings["appAutostart"]) {
      ipcRenderer.callMain(SettingsActions.SetAutostart, value)
      this.updateSettings({ key: "appAutostart", value })
    },
    setTethering(value: AppSettings["appTethering"]) {
      this.updateSettings({ key: "appTethering", value })
    },
    setIncomingCalls(value: AppSettings["appIncomingCalls"]) {
      this.updateSettings({ key: "appIncomingCalls", value })
    },
    setIncomingMessages(value: AppSettings["appIncomingMessages"]) {
      this.updateSettings({ key: "appIncomingMessages", value })
    },
    setLowBattery(value: AppSettings["appLowBattery"]) {
      this.updateSettings({ key: "appLowBattery", value })
    },
    setOsUpdates(value: AppSettings["appOsUpdates"]) {
      this.updateSettings({ key: "appOsUpdates", value })
    },
    setNonStandardAudioFilesConversion(
      value: AppSettings["appNonStandardAudioFilesConversion"]
    ) {
      this.updateSettings({ key: "appNonStandardAudioFilesConversion", value })
    },
    setConvert(value: AppSettings["appConvert"]) {
      this.updateSettings({ key: "appConvert", value })
    },
    setConversionFormat(value: AppSettings["appConversionFormat"]) {
      this.updateSettings({ key: "appConversionFormat", value })
    },
    setAppTray(value: AppSettings["appTray"]) {
      this.updateSettings({ key: "appTray", value })
    },
    setPureOsBackupLocation(value: AppSettings["pureOsBackupLocation"]) {
      this.updateSettings({ key: "pureOsBackupLocation", value })
    },
    setPureOsDownloadLocation(value: AppSettings["pureOsDownloadLocation"]) {
      this.updateSettings({ key: "pureOsDownloadLocation", value })
    },
    setLanguage(value: AppSettings["language"]) {
      this.updateSettings({ key: "language", value })
    },
  }),
}
