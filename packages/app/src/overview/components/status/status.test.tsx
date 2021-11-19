/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { DeviceType } from "@mudita/pure"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { StatusProps } from "App/overview/components/status/status.interface"
import Status from "App/overview/components/status/status.component"
import { intl } from "Renderer/utils/intl"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"

const renderStatus = ({
  deviceType = DeviceType.MuditaPure,
  batteryLevel = 0.75,
  network = "Play",
  networkLevel = 0.75,
}: Partial<StatusProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <Status
      deviceType={deviceType}
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

test("matches snapshot", () => {
  const { container } = renderStatus()
  expect(container).toMatchSnapshot()
})

describe("Device: Mudita pure", () => {
  test("pure info renders properly", () => {
    const { getByText, getByTestId } = renderStatus({
      deviceType: DeviceType.MuditaPure,
    })
    expect(getByText("75 %")).toBeInTheDocument()
    expect(getByText("Play")).toBeInTheDocument()
    expect(
      getByText(intl.formatMessage({ id: "module.overview.phoneBattery" }))
    ).toBeInTheDocument()
    expect(getByTestId("icon-HighRange")).toBeInTheDocument()
  })

  test("renders card title properly", () => {
    const { queryByText } = renderStatus({ deviceType: DeviceType.MuditaPure })
    expect(
      queryByText(intl.formatMessage({ id: "module.overview.statusPureTitle" }))
    ).toBeInTheDocument()
  })
  test("renders duplicated network name properly", () => {
    const { getByTestId } = renderStatus({
      deviceType: DeviceType.MuditaPure,
      network: "Orange Orange",
    })
    expect(getByTestId(StatusTestIds.NetworkName)).toHaveTextContent("Orange")
  })
  test("renders custom duplicated network name properly", () => {
    const { getByTestId } = renderStatus({
      deviceType: DeviceType.MuditaPure,
      network: "T-Mobile T-Mobile.pl",
    })
    expect(getByTestId(StatusTestIds.NetworkName)).toHaveTextContent("T-Mobile")
  })
})

describe("Device: Mudita harmony", () => {
  test("harmony info renders properly", () => {
    const { getByText, queryByTestId } = renderStatus({
      deviceType: DeviceType.MuditaHarmony,
    })
    expect(
      getByText(intl.formatMessage({ id: "module.overview.phoneBattery" }))
    ).toBeInTheDocument()
    expect(queryByTestId("icon-HighRange")).not.toBeInTheDocument()
  })

  test("renders card title properly", () => {
    const { queryByText } = renderStatus({
      deviceType: DeviceType.MuditaHarmony,
    })
    expect(
      queryByText(
        intl.formatMessage({ id: "module.overview.statusHarmonyTitle" })
      )
    ).toBeInTheDocument()
  })
})
