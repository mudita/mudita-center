/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { DeviceType, CaseColour } from "Core/device/constants"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import Overview from "Core/overview/components/overview/overview.component"
import store from "Core/__deprecated__/renderer/store"
import { StatusTestIds } from "Core/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "Core/overview/components/system/system-test-ids.enum"
import { State } from "Core/core/constants"
import { BackupDeviceFlowTestIds } from "Core/overview/components/backup-device-flow/backup-device-flow-test-ids.component"
import { RestoreDeviceFlowTestIds } from "Core/overview/components/restore-device-flow/restore-device-flow-test-ids.component"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { flags } from "Core/feature-flags"
import { SynchronizationStatus } from "Core/data-sync/reducers"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import { DownloadState, SilentCheckForUpdateState } from "Core/update/constants"
import { CheckForUpdateState } from "Core/update/constants/check-for-update-state.constant"

type Props = ComponentProps<typeof Overview>

jest.mock("Core/settings/store/schemas/generate-application-id", () => ({
  generateApplicationId: () => "123",
}))

jest.mock("@electron/remote", () => ({
  Menu: () => ({
    popup: jest.fn(),
    append: jest.fn(),
  }),
  MenuItem: () => jest.fn(),
}))

jest.mock("Core/__deprecated__/renderer/requests/get-device-info.request", () =>
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

jest.mock(
  "Core/__deprecated__/renderer/requests/get-network-info.request",
  () =>
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

jest.mock(
  "Core/__deprecated__/renderer/requests/get-storage-info.request",
  () =>
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

jest.mock(
  "Core/__deprecated__/renderer/requests/get-battery-info.request",
  () =>
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
  backups: [],
  readRestoreDeviceDataState: jest.fn(),
  restoreDeviceState: State.Initial,
  startBackupDevice: jest.fn(),
  startRestoreDevice: jest.fn(),
  readBackupDeviceDataState: jest.fn(),
  backupDeviceState: State.Initial,
  networkLevel: 0,
  deviceType: DeviceType.MuditaPure,
  lastBackupDate: new Date("2020-01-15T07:35:01.562Z"),
  closeForceUpdateFlow: jest.fn(),
  startUpdateOs: jest.fn(),
  batteryLevel: 0,
  networkName: "network name",
  osVersion: "1.0.0",
  pureOsBackupLocation: "path/location/backup",
  serialNumber: undefined,
  updatingState: State.Initial,
  memorySpace: {
    reservedSpace: 100,
    usedUserSpace: 200,
    total: 200,
  },
  caseColour: CaseColour.Gray,
  syncState: SynchronizationStatus.Loaded,
  updateAllIndexes: jest.fn(),
  abortDownload: jest.fn(),
  checkForUpdate: jest.fn(),
  checkingForUpdateState: CheckForUpdateState.Initial,
  clearUpdateState: jest.fn(),
  downloadingState: DownloadState.Initial,
  downloadUpdates: jest.fn(),
  availableReleasesForUpdate: null,
  silentCheckForUpdateState: SilentCheckForUpdateState.Initial,
  updateOsError: null,
  downloadingReleasesProcessStates: null,
  updatingReleasesProcessStates: null,
  areAllReleasesDownloaded: false,
  backupError: null,
  setCheckForUpdateState: jest.fn(),
  forceUpdateNeeded: false,
  forceUpdate: jest.fn(),
  forceUpdateState: State.Initial,
  backupActionDisabled: false,
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <Overview {...props} />
    </Provider>
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
      backupDeviceState: State.Loading,
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
      backupDeviceState: State.Loaded,
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
      backupDeviceState: State.Failed,
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

  describe("when `restoreDeviceState` property is set to `Loading`", () => {
    const extraProps: Partial<Props> = {
      restoreDeviceState: State.Loading,
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

  describe("when `restoreDeviceState` property is set to `Loaded`", () => {
    const extraProps: Partial<Props> = {
      restoreDeviceState: State.Loaded,
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

  describe("when `restoreDeviceState` property is set to `Failed`", () => {
    const extraProps: Partial<Props> = {
      restoreDeviceState: State.Failed,
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
