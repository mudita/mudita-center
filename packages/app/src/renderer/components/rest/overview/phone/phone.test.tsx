/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { PhoneProps } from "Renderer/components/rest/overview/phone/phone.interface"
import Phone from "Renderer/components/rest/overview/phone/phone.component"
import { noop } from "Renderer/utils/noop"
import { fireEvent } from "@testing-library/dom"
import { waitFor } from "@testing-library/react"
import { intl } from "Renderer/utils/intl"
import { Router } from "react-router"
import { createMemoryHistory } from "history"

const renderPhone = ({
  onDisconnect = noop,
  batteryLevel = 0.75,
  network = "Play",
}: Partial<PhoneProps> = {}) => {
  const history = createMemoryHistory()
  const outcome = renderWithThemeAndIntl(
    <Router history={history}>
      <Phone
        onDisconnect={onDisconnect}
        batteryLevel={batteryLevel}
        network={network}
      />
    </Router>
  )
  return {
    ...outcome,
    disconnectButton: () => outcome.getByRole("button"),
  }
}

test("phone info renders properly", () => {
  const { disconnectButton, getByText } = renderPhone()
  expect(getByText("75 %")).toBeInTheDocument()
  expect(getByText("Play")).toBeInTheDocument()
  expect(
    getByText(intl.formatMessage({ id: "view.name.overview.phone.battery" }))
  ).toBeInTheDocument()
  expect(disconnectButton()).toBeInTheDocument()
})

test("disconnect button works properly", async () => {
  const onDisconnect = jest.fn()

  const { disconnectButton } = renderPhone({ onDisconnect })

  fireEvent.click(disconnectButton())

  await waitFor(() => {
    expect(onDisconnect).toHaveBeenCalled()
  })
})
