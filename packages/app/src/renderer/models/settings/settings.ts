/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RootState } from "Renderer/store"
import {
  getAppSettings,
  updateAppSettings,
} from "Renderer/requests/app-settings.request"
import {
  AppSettings,
  SettingsUpdateOption,
  StoreValues,
} from "App/main/store/settings.interface"
import { ipcRenderer } from "electron-better-ipc"
import { createSelector, Slicer, StoreSelectors } from "@rematch/select"
import { createModel } from "@rematch/core"
import { SettingsActions } from "Common/enums/settings-actions.enum"
import { RootModel } from "Renderer/models/models"
import logger from "App/main/utils/logger"
import e2eSettings from "Renderer/models/settings/e2e-settings.json"

const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

const settings = createModel<RootModel>({
  state: {
    settingsLoaded: false,
    appUpdateStepModalDisplayed: false,
  },
  reducers: {
    update(state: StoreValues, payload: Partial<StoreValues>) {
      return { ...state, ...payload }
    },
  },
  effects: (d) => {
    const dispatch = (d as unknown) as RootState

    return {
      async loadSettings() {
        const appSettings = await getAppSettings()
        if (simulatePhoneConnectionEnabled) {
          dispatch.settings.update({
            ...appSettings,
            ...e2eSettings,
            settingsLoaded: true,
          })
        } else {
          dispatch.settings.update({ ...appSettings, settingsLoaded: true })
        }

        appSettings.appCollectingData
          ? logger.enableRollbar()
          : logger.disableRollbar()
      },
      async updateSettings(option: SettingsUpdateOption) {
        await updateAppSettings(option)
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
        this.updateSettings({
          key: "appNonStandardAudioFilesConversion",
          value,
        })
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
      setAppUpdateStepModalDisplayed() {
        dispatch.settings.update({ appUpdateStepModalDisplayed: true })
      },
      toggleAppCollectingData(value: boolean) {
        this.updateSettings({ key: "appCollectingData", value })
        value ? logger.enableRollbar() : logger.disableRollbar()
      },
      toggleAppUpdateAvailable(appUpdateAvailable: boolean) {
        dispatch.settings.update({ appUpdateAvailable })
      },
    }
  },
  selectors: (slice: Slicer<StoreValues>) => ({
    appCollectingData() {
      return slice(({ appCollectingData }) => appCollectingData)
    },
    appUpdateStepModalDisplayed() {
      return slice(
        ({ appUpdateStepModalDisplayed }) => appUpdateStepModalDisplayed
      )
    },
    settingsLoaded() {
      return slice(({ settingsLoaded }) => settingsLoaded)
    },
    initialModalsShowed(models: StoreSelectors<any>) {
      return createSelector(
        models.settings.appCollectingData,
        models.settings.appUpdateStepModalDisplayed,
        models.settings.settingsLoaded,
        (appCollectingData, appUpdateStepModalDisplayed, settingsLoaded) => {
          return (
            settingsLoaded &&
            appUpdateStepModalDisplayed &&
            appCollectingData !== undefined
          )
        }
      )
    },
  }),
})

export default settings
