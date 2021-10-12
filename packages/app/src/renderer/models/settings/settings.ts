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
import { createSelector, Slicer, StoreSelectors } from "@rematch/select"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"
import logger from "App/main/utils/logger"
import e2eSettings from "Renderer/models/settings/e2e-settings.json"
import { isToday } from "Renderer/utils/is-today"
import getDeviceLogFiles from "Renderer/requests/get-device-log-files.request"
import uploadDataToFTPRequest from "App/renderer/requests/upload-data-to-ftp.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import getApplicationConfiguration from "App/renderer/requests/get-application-configuration.request"
import archiveFiles from "Renderer/requests/archive-files.request"
import { attachedFileName } from "Renderer/utils/hooks/use-create-bug-ticket/use-create-bug-ticket-builder"

const simulatePhoneConnectionEnabled = process.env.simulatePhoneConnection

export const initialState: SettingsState = {
  appUpdateAvailable: undefined,
  lowestSupportedOsVersion: undefined,
  lowestSupportedCenterVersion: undefined,
  appCurrentVersion: version,
  appUpdateStepModalDisplayed: false,
  appUpdateStepModalShow: false,
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
        } catch (error) {
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
      setAppUpdateStepModalDisplayed() {
        dispatch.settings.update({ appUpdateStepModalDisplayed: true })
      },
      toggleAppUpdateStepModalShow(appUpdateStepModalShow: boolean) {
        dispatch.settings.update({ appUpdateStepModalShow })
      },
      setDiagnosticSentTimestamp(
        value: AppSettings["diagnosticSentTimestamp"]
      ) {
        this.updateSettings({ key: "diagnosticSentTimestamp", value })
      },
      setCollectingData(value: AppSettings["appCollectingData"]) {
        this.updateSettings({ key: "appCollectingData", value })
      },
      toggleAppCollectingData(value: boolean) {
        this.updateSettings({ key: "appCollectingData", value })
        value ? logger.enableRollbar() : logger.disableRollbar()
      },
      toggleAppUpdateAvailable(appUpdateAvailable: boolean) {
        dispatch.settings.update({ appUpdateAvailable })
      },
      async sendDiagnosticData(_, state): Promise<void> {
        const { appCollectingData, diagnosticSentTimestamp } = state.settings
        const { serialNumber } = state.device.data

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
        const deviceLogFilesResponse = await getDeviceLogFiles({
          datePrefix: true,
        })

        if (
          deviceLogFilesResponse.status !== DeviceResponseStatus.Ok ||
          deviceLogFilesResponse.data === undefined
        ) {
          logger.error(
            `Send Diagnostic Data: fetch device logs fail. Message: ${deviceLogFilesResponse.error?.message}.`
          )
          return
        }

        const buffer = await archiveFiles({
          files: deviceLogFilesResponse.data,
        })

        if (buffer === undefined) {
          logger.error(`Send Diagnostic Data: archives files fail.`)
          return
        }

        try {
          const response = await uploadDataToFTPRequest({
            buffer,
            fileName: attachedFileName,
            serialNumber,
          })
          if (!response) {
            logger.error(
              `Send Diagnostic Data: send diagnostic data request. Status: ${status}`
            )
          }
          const nowTimestamp = Date.now()
          await dispatch.settings.setDiagnosticSentTimestamp(nowTimestamp)
          logger.info(
            `Send Diagnostic Data: data was sent successfully at ${nowTimestamp}, serialNumber: ${serialNumber}`
          )
        } catch {
          logger.error(`Send Diagnostic Data: send diagnostic data request.`)
        }
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
