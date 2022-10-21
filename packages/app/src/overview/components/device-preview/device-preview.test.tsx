/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React, { ComponentProps } from "react"
import { DeviceType, CaseColor } from "App/device/constants"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { DevicePreview } from "App/overview/components/device-preview/device-preview.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { fireEvent } from "@testing-library/dom"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import { DeviceTestIds } from "App/overview/components/device-preview/device-preview-test-ids.enum"
import { flags } from "App/feature-flags"

jest.mock("App/feature-flags")

const renderDevice = ({
  onDisconnect = noop,
  deviceType = DeviceType.MuditaPure,
  caseColour = CaseColor.Gray,
}: Partial<ComponentProps<typeof DevicePreview>> = {}) => {
  const history = createMemoryHistory()
  const outcome = renderWithThemeAndIntl(
    <Router history={history}>
      <DevicePreview
        deviceType={deviceType}
        onDisconnect={onDisconnect}
        caseColour={caseColour}
      />
    </Router>
  )
  return {
    ...outcome,
    disconnectButton: () => outcome.getByTestId(DeviceTestIds.DisconnectButton),
  }
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("disconnect button works properly", async () => {
  const onDisconnect = jest.fn()

  const { disconnectButton } = renderDevice({ onDisconnect })

  fireEvent.click(disconnectButton())

  expect(onDisconnect).toHaveBeenCalled()
})

test("Phone Component should render proper phone color", () => {
  jest.spyOn(flags, "get").mockReturnValue(true)
  const { getByTestId } = renderDevice({ caseColour: CaseColor.Black })

  expect(getByTestId(DeviceTestIds.PureBlack)).toBeInTheDocument()
})
