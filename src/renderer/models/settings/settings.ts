import { Dispatch } from "Renderer/store"
import {
  getAppSettings,
  updateAppSettings,
} from "Renderer/requests/app-settings.request"
import { AppSettings } from "App/main/default-app-settings"

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
    async updateSettings(settings: Partial<AppSettings>) {
      await updateAppSettings(settings)
      dispatch.settings.update(settings)
    },
    async setAutostart(value: AppSettings["appAutostart"]) {
      await this.updateSettings({ appAutostart: value })
    },
    async setTethering(value: AppSettings["appTethering"]) {
      await this.updateSettings({ appTethering: value })
    },
    async setIncomingCalls(value: AppSettings["appIncomingCalls"]) {
      await this.updateSettings({ appIncomingCalls: value })
    },
    async setIncomingMessages(value: AppSettings["appIncomingMessages"]) {
      await this.updateSettings({ appIncomingMessages: value })
    },
    async setLowBattery(value: AppSettings["appLowBattery"]) {
      await this.updateSettings({ appLowBattery: value })
    },
    async setOsUpdates(value: AppSettings["appOsUpdates"]) {
      await this.updateSettings({ appOsUpdates: value })
    },
    async setNonStandardAudioFilesConversion(
      value: AppSettings["appNonStandardAudioFilesConversion"]
    ) {
      await this.updateSettings({ appNonStandardAudioFilesConversion: value })
    },
    async setConvert(value: AppSettings["appConvert"]) {
      await this.updateSettings({ appConvert: value })
    },
    async setConversionFormat(value: AppSettings["appConversionFormat"]) {
      await this.updateSettings({ appConversionFormat: value })
    },
    async setAppTray(value: AppSettings["appTray"]) {
      await this.updateSettings({ appTray: value })
    },
    async setPureOsBackupLocation(value: AppSettings["pureOsBackupLocation"]) {
      await this.updateSettings({ pureOsBackupLocation: value })
    },
    async setPureOsDownloadLocation(
      value: AppSettings["pureOsDownloadLocation"]
    ) {
      await this.updateSettings({ pureOsDownloadLocation: value })
    },
    async setLanguage(value: AppSettings["language"]) {
      await this.updateSettings({ language: value })
    },
  }),
}
