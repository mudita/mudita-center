/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Provider } from "react-redux"
import store from "App/__deprecated__/renderer/store"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { HarmonyOverview } from "App/overview/components/overview-screens/harmony-overview/harmony-overview.component"
import { UpdatingState } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import { intl } from "App/__deprecated__/renderer/utils/intl"

jest.mock("@electron/remote", () => ({
  Menu: () => ({
    popup: jest.fn(),
    append: jest.fn(),
  }),
  MenuItem: () => jest.fn(),
}))

const defaultProps: ComponentProps<typeof HarmonyOverview> = {
  lowestSupportedOsVersion: "",
  lastAvailableOsVersion: "",
  batteryLevel: undefined,
  osVersion: "1.0.0",
  pureOsDownloaded: false,
  updatingState: UpdatingState.Standby,
  serialNumber: undefined,
  startUpdateOs: jest.fn(),
  setUpdateState: jest.fn(),
  updatePhoneOsInfo: jest.fn(),
  disconnectDevice: jest.fn(),
  openContactSupportFlow: jest.fn(),
}

const render = () => {
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <HarmonyOverview {...defaultProps} />
    </Provider>
  )
}

test("Renders Mudita harmony data", () => {
  const { getByTestId, queryByTestId, queryByText } = render()

  expect(getByTestId(StatusTestIds.BatteryLevel)).toHaveTextContent("0 %")
  expect(queryByTestId(StatusTestIds.NetworkName)).not.toBeInTheDocument()
  queryByText(intl.formatMessage({ id: "module.overview.statusHarmonyTitle" }))
  expect(getByTestId(SystemTestIds.OsVersion)).toHaveTextContent("1.0.0")
})
