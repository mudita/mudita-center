/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { DeviceType } from "@mudita/pure"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { DevicePreviewProps } from "App/overview/components/device-preview/device-preview.interface"
import { DevicePreview } from "App/overview/components/device-preview/device-preview.component"
import { noop } from "Renderer/utils/noop"
import { fireEvent } from "@testing-library/dom"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import { DeviceTestIds } from "App/overview/components/device-preview/device-preview-test-ids.enum"

const renderPhone = ({
  onDisconnect = noop,
  deviceType = DeviceType.MuditaPure,
}: Partial<DevicePreviewProps> = {}) => {
  const history = createMemoryHistory()
  const outcome = renderWithThemeAndIntl(
    <Router history={history}>
      <DevicePreview deviceType={deviceType} onDisconnect={onDisconnect} />
    </Router>
  )
  return {
    ...outcome,
    disconnectButton: () => outcome.getByTestId(DeviceTestIds.DisconnectButton),
  }
}

test("disconnect button works properly", async () => {
  const onDisconnect = jest.fn()

  const { disconnectButton } = renderPhone({ onDisconnect })

  fireEvent.click(disconnectButton())

  expect(onDisconnect).toHaveBeenCalled()
})
