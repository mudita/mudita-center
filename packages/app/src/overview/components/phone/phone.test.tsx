/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { PhoneProps } from "App/overview/components/phone/phone.interface"
import Phone from "App/overview/components/phone/phone.component"
import { noop } from "Renderer/utils/noop"
import { fireEvent } from "@testing-library/dom"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import { PhoneTestIds } from "App/overview/components/phone//phone-test-ids.enum"

const renderPhone = ({ onDisconnect = noop }: Partial<PhoneProps> = {}) => {
  const history = createMemoryHistory()
  const outcome = renderWithThemeAndIntl(
    <Router history={history}>
      <Phone onDisconnect={onDisconnect} />
    </Router>
  )
  return {
    ...outcome,
    disconnectButton: () => outcome.getByTestId(PhoneTestIds.DisconnectButton),
  }
}

test("disconnect button works properly", async () => {
  const onDisconnect = jest.fn()

  const { disconnectButton } = renderPhone({ onDisconnect })

  fireEvent.click(disconnectButton())

  expect(onDisconnect).toHaveBeenCalled()
})
