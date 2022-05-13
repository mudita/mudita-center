/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { version } from "../../../../package.json"
import isVersionGreater from "App/overview/helpers/is-version-greater"
import { RootState } from "Renderer/store"
import {
  getAppSettings,
  updateAppSettings,
} from "Renderer/requests/app-settings.request"
import {
  AppSettings,
  SettingsUpdateOption,
  SettingsState,
} from "App/main/store/settings.interface"
import { Slicer } from "@rematch/select"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"
import logger from "App/main/utils/logger"
import e2eSettings from "Renderer/models/settings/e2e-settings.json"
import { isToday } from "Renderer/utils/is-today"
import getApplicationConfiguration from "App/renderer/requests/get-application-configuration.request"
import { loadBackupData } from "App/backup/actions"
import {
  checkAppForcedUpdateFlowToShow,
  checkCollectingDataModalToShow,
  checkAppUpdateFlowToShow,
} from "App/modals-manager/actions"
import checkAppUpdateRequest from "Renderer/requests/check-app-update.request"
import { toggleTrackingRequest } from "App/analytic-data-tracker/requests"

const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

export const initialState: SettingsState = {
  appUpdateAvailable: undefined,
  lowestSupportedOsVersion: undefined,
  lowestSupportedCenterVersion: undefined,
  appCurrentVersion: version,
  settingsLoaded: false,
  appUpdateRequired: false,
  appLatestVersion: "",
}

const settings = createModel<RootModel>({
  state: initialState,
  reducers: {
    update(state: SettingsState, payload: Partial<SettingsState>) {
      return { ...state, ...payload }
    },
  },
  effects: (d) => {
    const dispatch = d as unknown as RootState

    return {
      async loadSettings() {
        const appSettings = await getAppSettings()
        const applicationConfiguration = await getApplicationConfiguration()

        let appUpdateRequired = false

        try {
          appUpdateRequired = isVersionGreater(
            applicationConfiguration.centerVersion,
            version
          )
        } catch (error: any) {
          logger.error(
            `Settings -> LoadSettings: Check that app update required fails: ${error.message}`
          )
        }

        const settings = {
          ...appSettings,
          appUpdateRequired,
          lowestSupportedOsVersion: applicationConfiguration.osVersion,
          settingsLoaded: true,
        }

        if (simulatePhoneConnectionEnabled) {
          dispatch.settings.update({
            ...e2eSettings,
            ...settings,
          })
        } else {
          dispatch.settings.update(settings)
        }

        appSettings.appCollectingData
          ? logger.enableRollbar()
          : logger.disableRollbar()

        // @ts-ignore
        dispatch(loadBackupData())
        // @ts-ignore
        dispatch(checkAppUpdateFlowToShow())
        // @ts-ignore
        dispatch(checkAppForcedUpdateFlowToShow())
        // @ts-ignore
        dispatch(checkCollectingDataModalToShow())
      },
      async updateSettings(option: SettingsUpdateOption) {
        await updateAppSettings(option)
        dispatch.settings.update({ [option.key]: option.value })
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
      setDiagnosticSentTimestamp(
        value: AppSettings["diagnosticSentTimestamp"]
      ) {
        this.updateSettings({ key: "diagnosticSentTimestamp", value })
      },
      toggleAppCollectingData(value: boolean) {
        this.updateSettings({ key: "appCollectingData", value })
        value ? logger.enableRollbar() : logger.disableRollbar()
        void toggleTrackingRequest(value)
      },
      checkAppUpdateAvailable() {
        dispatch.settings.update({ appUpdateAvailable: undefined })
        void checkAppUpdateRequest()
      },
      toggleAppUpdateAvailable(appUpdateAvailable: boolean) {
        dispatch.settings.update({ appUpdateAvailable })
        // @ts-ignore
        dispatch(checkAppUpdateFlowToShow())
      },
      async sendDiagnosticData(_, state): Promise<void> {
        const { appCollectingData, diagnosticSentTimestamp } = state.settings
        const { serialNumber } = state.device?.data

        if (serialNumber === undefined) {
          logger.error(
            `Send Diagnostic Data: device logs fail. SerialNumber is undefined.`
          )
          return
        }
        if (!appCollectingData) {
          logger.info("Send Diagnostic Data: user no allowed sent data")
          return
        }

        if (isToday(new Date(diagnosticSentTimestamp))) {
          logger.info(
            `Send Diagnostic Data: data was sent at ${diagnosticSentTimestamp}`
          )
          return
        }

        logger.info(
          `Send Diagnostic Data: skipped until the diagnostic data and storage system will be refined`
        )

        const nowTimestamp = Date.now()
        await dispatch.settings.setDiagnosticSentTimestamp(nowTimestamp)
      },
      setAppLatestVersion(appLatestVersion: string) {
        dispatch.settings.update({ appLatestVersion })
      },
    }
  },
  selectors: (slice: Slicer<SettingsState>) => ({
    appCollectingData() {
      return slice(({ appCollectingData }) => appCollectingData)
    },
    settingsLoaded() {
      return slice(({ settingsLoaded }) => settingsLoaded)
    },
  }),
})

export default settings
