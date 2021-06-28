/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { NetworkProps } from "Renderer/components/rest/overview/network/network.interface"
import Network from "Renderer/components/rest/overview/network/network.component"
import { intl } from "Renderer/utils/intl"

const renderNetwork = ({
  batteryLevel = 0.75,
  network = "Play",
  networkLevel = 0.75,
}: Partial<NetworkProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <Network
      batteryLevel={batteryLevel}
      network={network}
      networkLevel={networkLevel}
    />
  )
  return {
    ...outcome,
    getButtons: () => outcome.queryAllByRole("button"),
    getDescription: () =>
      outcome.queryByText(
        intl.formatMessage({ id: "module.overview.networkDescription" })
      ),
  }
}

test("phone info renders properly", () => {
  const { getByText, getByTestId } = renderNetwork()
  expect(getByText("75 %")).toBeInTheDocument()
  expect(getByText("Play")).toBeInTheDocument()
  expect(
    getByText(intl.formatMessage({ id: "module.overview.phoneBattery" }))
  ).toBeInTheDocument()
  expect(getByTestId("icon-HighRange")).toBeInTheDocument()
})

test("matches snapshot", () => {
  const { container } = renderNetwork()
  expect(container).toMatchSnapshot()
})

test("renders card title properly", () => {
  const { queryByText } = renderNetwork()
  expect(
    queryByText(intl.formatMessage({ id: "module.overview.networkTitle" }))
  ).toBeInTheDocument()
})
