/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import thunk from "redux-thunk"
import React, { ComponentProps } from "react"
import { fireEvent } from "@testing-library/dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import System from "App/overview/components/system/system.component"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { CaseColor, DeviceType, PureDeviceData } from "App/device"
import { Provider } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import createMockStore from "redux-mock-store"
import { OsRelease } from "App/update/dto"
import { initialState as update } from "App/update/reducers"
import { initialState as device } from "App/device/reducers/device.reducer"
import {
  OsReleaseType,
  Product,
  ReleaseProcessState,
  SilentCheckForUpdateState,
} from "App/update/constants"

type Props = ComponentProps<typeof System>

const defaultProps: Props = {
  deviceType: DeviceType.MuditaPure,
  osVersion: "1.0.0",
}

const pureDeviceMock: PureDeviceData = {
  networkName: "Network",
  networkLevel: "5",
  osVersion: "0.75.1",
  batteryLevel: 0.99,
  simCards: [
    {
      slot: 1,
      active: true,
      number: 12345678,
      network: "",
      networkLevel: 0.75,
    },
  ],
  serialNumber: "303",
  phoneLockTime: 1630703219,
  memorySpace: {
    reservedSpace: 124,
    usedUserSpace: 1021,
    total: 16000000000,
  },
  caseColour: CaseColor.Gray,
  backupFilePath: "path/to/directory/fileBase.tar",
}

const mockedRelease: OsRelease = {
  date: "2021-02-02",
  file: {
    name: "test file",
    size: 123,
    url: "some-url",
  },
  product: Product.PurePhone,
  type: OsReleaseType.Daily,
  version: "1.1.0",
  mandatoryVersions: [],
}

const defaultState = {
  update,
  device: {
    ...device,
    data: pureDeviceMock,
  },
} as ReduxRootState

const render = (
  extraState?: Partial<ReduxRootState>,
  extraProps?: Partial<Props>
) => {
  const storeMock = createMockStore([thunk])({
    ...defaultState,
    ...extraState,
  })

  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(
    <Provider store={storeMock}>
      <System {...props} />
    </Provider>
  )
}

test("renders os version properly", () => {
  const { getByTestId } = render()
  expect(getByTestId(SystemTestIds.OsVersion)).toHaveTextContent(
    "[value] module.overview.muditaOsUpdateTitle 1.0.0"
  )
})

test("renders available update info properly", () => {
  const { getByText } = render({
    update: {
      ...update,
      silentCheckForUpdate: SilentCheckForUpdateState.Loaded,
      data: {
        ...update.data,
        availableReleasesForUpdate: [mockedRelease],
      },
    },
  })
  expect(
    getByText(
      intl.formatMessage({ id: "module.overview.systemUpdateAvailable" })
    )
  ).toBeInTheDocument()
})

test("renders You're up to date info properly", () => {
  const { getByText } = render({
    update: {
      ...update,
      silentCheckForUpdate: SilentCheckForUpdateState.Loaded,
    },
  })
  expect(
    getByText(
      intl.formatMessage({ id: "module.overview.systemUpdateUpToDate" })
    )
  ).toBeInTheDocument()
})

test("renders 'check for updates' button properly", () => {
  const { queryByRole } = render()
  expect(queryByRole("button")).toHaveTextContent(
    intl.formatMessage({ id: "module.overview.systemCheckForUpdates" })
  )
})

test("renders 'update now' button properly", () => {
  const { queryByRole } = render({
    update: {
      ...update,
      silentCheckForUpdate: SilentCheckForUpdateState.Loaded,
      data: {
        ...update.data,
        availableReleasesForUpdate: [mockedRelease],
      },
    },
  })
  expect(queryByRole("button")).toHaveTextContent(
    intl.formatMessage({ id: "module.overview.systemDownloadAction" })
  )
})

test("does not render any label when check for update was not performed", () => {
  const { queryByText } = render({})
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateAvailable" })
    )
  ).not.toBeInTheDocument()
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateUpToDate" })
    )
  ).not.toBeInTheDocument()
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateDownloaded" })
    )
  ).not.toBeInTheDocument()
})
test("does not render any label when check for update is in progress", () => {
  const { queryByText } = render({})
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateAvailable" })
    )
  ).not.toBeInTheDocument()
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateUpToDate" })
    )
  ).not.toBeInTheDocument()
  expect(
    queryByText(
      intl.formatMessage({ id: "module.overview.systemUpdateDownloaded" })
    )
  ).not.toBeInTheDocument()
})

test("checks for update after button click", () => {
  const onUpdateCheck = jest.fn()
  const props = { onUpdateCheck }

  const { getByRole } = render(
    {
      update: {
        ...update,
        silentCheckForUpdate: SilentCheckForUpdateState.Loaded,
      },
    },
    props
  )

  fireEvent.click(getByRole("button"))

  expect(onUpdateCheck).toHaveBeenCalled()
})

test("triggers download after button click", () => {
  const onDownload = jest.fn()
  const props = { onDownload }
  const { getByRole } = render(
    {
      update: {
        ...update,
        silentCheckForUpdate: SilentCheckForUpdateState.Loaded,
        data: {
          ...update.data,
          availableReleasesForUpdate: [mockedRelease],
        },
      },
    },
    props
  )

  fireEvent.click(getByRole("button"))

  expect(onDownload).toHaveBeenCalled()
})

test("triggers update after button click", () => {
  const onUpdate = jest.fn()
  const props = { onUpdate }

  const { getByRole } = render(
    {
      update: {
        ...update,
        silentCheckForUpdate: SilentCheckForUpdateState.Loaded,
        data: {
          ...update.data,
          downloadedProcessedReleases: [
            { release: mockedRelease, state: ReleaseProcessState.Done },
          ],
        },
      },
    },
    props
  )

  fireEvent.click(getByRole("button"))

  expect(onUpdate).toHaveBeenCalled()
})
