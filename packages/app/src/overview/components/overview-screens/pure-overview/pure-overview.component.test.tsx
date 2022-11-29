/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import { Router } from "react-router"
import { CaseColor } from "App/device/constants"
import store from "App/__deprecated__/renderer/store"
import history from "App/__deprecated__/renderer/routes/history"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { PureOverview } from "App/overview/components/overview-screens/pure-overview/pure-overview.component"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { State } from "App/core/constants"
import { SynchronizationState } from "App/data-sync/reducers"
import { ErrorSyncModalTestIds } from "App/connecting/components/error-sync-modal/error-sync-modal-test-ids.enum"
import * as UpdatingForceModalFlowModule from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.component"
import { UpdatingForceModalFlowProps } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.interface"
import { UpdatingForceModalFlowState } from "App/overview/components/updating-force-modal-flow/updating-force-modal-flow.enum"
import { flags } from "App/feature-flags"
import { DownloadState } from "App/update/constants"

// TODO [mw] add integration tests for update process - scope of the next PR (after all the changes from CP-1681 are done)

jest.mock("App/feature-flags")

jest.mock("electron", () => ({
  remote: {
    Menu: () => ({
      popup: jest.fn(),
      append: jest.fn(),
    }),
    MenuItem: () => jest.fn(),
  },
}))

type Props = ComponentProps<typeof PureOverview>

const defaultProps: Props = {
  openContactSupportFlow: jest.fn(),
  backupDeviceState: State.Initial,
  backups: [],
  caseColour: CaseColor.Black,
  networkLevel: 0,
  readBackupDeviceDataState: jest.fn(),
  readRestoreDeviceDataState: jest.fn(),
  restoreDeviceState: State.Initial,
  startBackupDevice: jest.fn(),
  startRestoreDevice: jest.fn(),
  setUpdateState: jest.fn(),
  startUpdateOs: jest.fn(),
  lowestSupportedOsVersion: undefined,
  batteryLevel: 0,
  disconnectDevice: jest.fn(),
  lastBackupDate: new Date("2020-01-15T07:35:01.562Z"),
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
  syncState: SynchronizationState.Loaded,
  updateAllIndexes: jest.fn(),
  abortDownload: jest.fn(),
  allReleases: [],
  checkForUpdate: jest.fn(),
  checkingForUpdateState: State.Initial,
  clearUpdateState: jest.fn(),
  downloadingState: DownloadState.Initial,
  downloadUpdate: jest.fn(),
  releaseAvailableForUpdate: null,
  silentCheckForUpdate: jest.fn(),
  silentUpdateCheck: false,
  updateOsError: null,
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={store}>
        <PureOverview {...props} />
      </Provider>
    </Router>
  )
}

afterEach(() => {
  jest.clearAllMocks()
})

test("Renders Mudita pure data", () => {
  const { getByTestId, queryByText } = render()
  expect(getByTestId(StatusTestIds.BatteryLevel)).toHaveTextContent("0 %")
  expect(getByTestId(StatusTestIds.NetworkName)).toHaveTextContent(
    "network name"
  )
  queryByText(intl.formatMessage({ id: "module.overview.statusPureTitle" }))
  expect(getByTestId(SystemTestIds.OsVersion)).toHaveTextContent("1.0.0")
})

describe("`ErrorSyncModal` logic", () => {
  test("when sync error occurred and `restoreDeviceState` is undefined modal is visible", () => {
    const { queryByTestId } = render({
      restoreDeviceState: undefined,
      syncState: SynchronizationState.Error,
    })
    expect(queryByTestId(ErrorSyncModalTestIds.Container)).toBeInTheDocument()
  })
  test("when sync error occurred and `restoreDeviceState` has empty state modal is visible", () => {
    const { queryByTestId } = render({
      restoreDeviceState: State.Initial,
      syncState: SynchronizationState.Error,
    })
    expect(queryByTestId(ErrorSyncModalTestIds.Container)).toBeInTheDocument()
  })
  test("when sync error occurred and `restoreDeviceState` has failed state modal isn't visible", () => {
    const { queryByTestId } = render({
      restoreDeviceState: State.Failed,
      syncState: SynchronizationState.Error,
    })
    expect(
      queryByTestId(ErrorSyncModalTestIds.Container)
    ).not.toBeInTheDocument()
  })
  test("when sync error occurred and `restoreDeviceState` has loading state modal isn't visible", () => {
    const { queryByTestId } = render({
      restoreDeviceState: State.Loading,
      syncState: SynchronizationState.Error,
    })
    expect(
      queryByTestId(ErrorSyncModalTestIds.Container)
    ).not.toBeInTheDocument()
  })
  test("when sync error occurred and `restoreDeviceState` has loaded state modal isn't visible", () => {
    const { queryByTestId } = render({
      restoreDeviceState: State.Loaded,
      syncState: SynchronizationState.Error,
    })
    expect(
      queryByTestId(ErrorSyncModalTestIds.Container)
    ).not.toBeInTheDocument()
  })
})

describe("update state", () => {
  jest.spyOn(flags, "get").mockReturnValue(true)

  type TestCase = [
    updatingStateKeyValue: keyof typeof State | undefined, // passing as key to improve test title readability
    isOsSupported: boolean,
    updatingForceModalState: UpdatingForceModalFlowState
  ]

  const testCases: TestCase[] = [
    ["Loaded", true, UpdatingForceModalFlowState.Success],
    ["Failed", true, UpdatingForceModalFlowState.Fail],
    ["Loading", true, UpdatingForceModalFlowState.Updating],
    ["Loading", false, UpdatingForceModalFlowState.Updating],
    [undefined, false, UpdatingForceModalFlowState.Info],
  ]

  let updateForceModalSpy: jest.SpyInstance<
    unknown,
    UpdatingForceModalFlowProps[]
  >

  beforeEach(() => {
    updateForceModalSpy = jest.spyOn(UpdatingForceModalFlowModule, "default")
  })

  describe.each(testCases)(
    "when updating state from store equals to %p and os support state equal to %p",
    (updatingStateKeyValue, isOsSupported, updatingForceModalState) => {
      test(`update force modal should receive ${updatingForceModalState}`, () => {
        const updatingState = updatingStateKeyValue
          ? State[updatingStateKeyValue]
          : undefined

        if (isOsSupported) {
          render({
            osVersion: "1.1.0",
            lowestSupportedOsVersion: "1.0.0",
            updatingState,
          })
        } else {
          render({
            updatingState,
            osVersion: "0.1.0",
            lowestSupportedOsVersion: "1.0.0",
          })
        }

        expect(updateForceModalSpy).toHaveBeenLastCalledWith(
          expect.objectContaining({
            state: updatingForceModalState,
          }),
          expect.anything()
        )
      })
    }
  )
})
