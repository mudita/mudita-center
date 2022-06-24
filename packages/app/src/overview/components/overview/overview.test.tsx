/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { Router } from "react-router"
import { DeviceType, CaseColour } from "@mudita/pure"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import Overview from "App/overview/components/overview/overview.component"
import {
  DataState,
  UpdatingState,
} from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import { ConversionFormat, Convert } from "App/__deprecated__/main/store/settings.interface"
import store from "App/__deprecated__/renderer/store"
import history from "App/__deprecated__/renderer/routes/history"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { BackupDeviceDataState } from "App/backup-device/reducers"
import { BackupDeviceFlowTestIds } from "App/overview/components/backup-device-flow/backup-device-flow-test-ids.component"
import { RestoreDeviceDataState } from "App/restore-device/reducers"
import { RestoreDeviceFlowTestIds } from "App/overview/components/restore-device-flow/restore-device-flow-test-ids.component"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { flags } from "App/feature-flags"
import { SynchronizationState } from "App/data-sync/reducers"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

type Props = ComponentProps<typeof Overview>

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

jest.mock("App/__deprecated__/renderer/requests/get-device-info.request", () =>
  jest.fn(() => ({
    status: RequestResponseStatus.Ok,
    data: {
      name: "Ziemniaczek",
      modelName: "U12300000",
      modelNumber: "A1239999",
      serilaNumber: "a-b-3d",
      osVersion: "0.123v",
    },
  }))
)

jest.mock("App/__deprecated__/renderer/requests/get-network-info.request", () =>
  jest.fn(() => ({
    status: RequestResponseStatus.Ok,
    data: {
      simCards: [
        {
          active: true,
          network: "Y-Mobile",
          networkLevel: 0.5,
          number: 12345678,
          slot: 1,
        },
        {
          active: false,
          network: "X-Mobile",
          networkLevel: 0.69,
          number: 7001234523,
          slot: 2,
        },
      ],
    },
  }))
)

jest.mock("App/__deprecated__/renderer/requests/get-storage-info.request", () =>
  jest.fn(() => ({
    status: RequestResponseStatus.Ok,
    data: {
      capacity: 9001,
      available: 99999999999999,
      categories: [
        { label: "music", filesCount: 1233333, size: 999999999 },
        { label: "storage", filesCount: 100000, size: 999999999 },
      ],
    },
  }))
)

jest.mock("App/__deprecated__/renderer/requests/get-battery-info.request", () =>
  jest.fn(() => ({
    status: RequestResponseStatus.Ok,
    data: {
      level: 9001,
      charging: false,
      maximumCapacity: 99999,
    },
  }))
)

const defaultProps: Props = {
  openContactSupportFlow: jest.fn(),
  backupLocation: "",
  backups: [],
  readRestoreDeviceDataState: jest.fn(),
  restoreDeviceState: RestoreDeviceDataState.Empty,
  startBackupDevice: jest.fn(),
  startRestoreDevice: jest.fn(),
  readBackupDeviceDataState: jest.fn(),
  backupDeviceState: BackupDeviceDataState.Empty,
  diagnosticSentTimestamp: 0,
  networkLevel: "",
  phoneLockTime: 0,
  deviceType: DeviceType.MuditaPure,
  appLatestVersion: "",
  appUpdateAvailable: undefined,
  lowestSupportedOsVersion: undefined,
  lowestSupportedCenterVersion: undefined,
  settingsLoaded: false,
  deviceUnlocked: undefined,
  appAutostart: false,
  appCollectingData: undefined,
  appConversionFormat: ConversionFormat.FLAC,
  appConvert: Convert.ConvertAutomatically,
  appIncomingCalls: false,
  appIncomingMessages: false,
  appLowBattery: false,
  appNonStandardAudioFilesConversion: false,
  appOsUpdates: false,
  appTethering: false,
  appTray: false,
  batteryLevel: 0,
  changeSim: jest.fn(),
  disconnectDevice: jest.fn(),
  deviceConnected: true,
  language: "en-US",
  loadData: jest.fn(),
  networkName: "network name",
  osVersion: "release-1.0.0",
  pureNeverConnected: false,
  pureOsBackupLocation: "path/location/backup",
  pureOsDownloadLocation: "path/location/download",
  basicInfoDataState: DataState.Empty,
  serialNumber: undefined,
  initialDataLoaded: false,
  appVersion: undefined,
  toggleAppCollectingData: jest.fn(),
  simCards: [
    {
      active: true,
      network: "Y-Mobile",
      networkLevel: 0.2,
      number: 12345678,
      slot: 1,
    },
  ],
  toggleDeviceUpdating: jest.fn(),
  updatePhoneOsInfo: jest.fn(),
  updatingState: UpdatingState.Standby,
  memorySpace: {
    free: 100,
    full: 200,
  },
  caseColour: CaseColour.Gray,
  syncState: SynchronizationState.Loaded,
  updateAllIndexes: jest.fn(),
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={store}>
        <Overview {...props} />
      </Provider>
    </Router>
  )
}

describe("`Overview` component for `MuditaPure` type,", () => {
  describe("when component is render with default props", () => {
    test("loadData is fired when component is mounted", () => {
      jest.spyOn(flags, "get").mockReturnValue(true)
      const { getByTestId, queryByText } = render()
      expect(getByTestId(StatusTestIds.BatteryLevel)).toHaveTextContent("0 %")
      expect(getByTestId(StatusTestIds.NetworkName)).toHaveTextContent(
        "network name"
      )
      queryByText(intl.formatMessage({ id: "module.overview.statusPureTitle" }))
      expect(getByTestId(SystemTestIds.OsVersion)).toHaveTextContent("1.0.0")
    })

    test("any modal from `BackupDeviceFlow` shouldn't be displayed", () => {
      const { queryByTestId } = render()

      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceFinished)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceError)
      ).not.toBeInTheDocument()
    })

    test("any modal from `RestoreDeviceFlow` shouldn't be displayed", () => {
      const { queryByTestId } = render()

      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreAvailableBackupModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceFinished)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `backupDeviceState` property is set to `Running`", () => {
    const extraProps: Partial<Props> = {
      backupDeviceState: BackupDeviceDataState.Running,
    }
    test("should be displayed `BackupModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceRunning)
      ).toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceFinished)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `backupDeviceState` property is set to `Finished`", () => {
    const extraProps: Partial<Props> = {
      backupDeviceState: BackupDeviceDataState.Finished,
    }
    test("should be displayed `BackupSuccessModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceFinished)
      ).toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `backupDeviceState` property is set to `Error`", () => {
    const extraProps: Partial<Props> = {
      backupDeviceState: BackupDeviceDataState.Error,
    }
    test("should be displayed `BackupFailureModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceError)
      ).toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(BackupDeviceFlowTestIds.BackupDeviceFinished)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `restoreDeviceState` property is set to `Running`", () => {
    const extraProps: Partial<Props> = {
      restoreDeviceState: RestoreDeviceDataState.Running,
    }
    test("should be displayed `RestoreRunningModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceRunning)
      ).toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreAvailableBackupModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceFinished)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `restoreDeviceState` property is set to `Finished`", () => {
    const extraProps: Partial<Props> = {
      restoreDeviceState: RestoreDeviceDataState.Finished,
    }
    test("should be displayed `RestoreSuccessModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceFinished)
      ).toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreAvailableBackupModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceError)
      ).not.toBeInTheDocument()
    })
  })

  describe("when `restoreDeviceState` property is set to `Error`", () => {
    const extraProps: Partial<Props> = {
      restoreDeviceState: RestoreDeviceDataState.Error,
    }
    test("should be displayed `RestoreFailureModal`", () => {
      const { queryByTestId } = render(extraProps)

      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceError)
      ).toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreAvailableBackupModal)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceStart)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceRunning)
      ).not.toBeInTheDocument()
      expect(
        queryByTestId(RestoreDeviceFlowTestIds.RestoreDeviceFinished)
      ).not.toBeInTheDocument()
    })
  })
})
