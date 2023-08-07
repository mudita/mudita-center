/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import BatteryIcon from "App/__deprecated__/renderer/components/core/icon/battery-icon.component"
import { DeviceType } from "App/device"

describe("battery icon returns correct component", () => {
  const testScenario = [
    {
      batteryLevel: 0.2,
      charging: true,
      dataTestId: "icon-ChargingBattery",
    },
    {
      batteryLevel: 0,
      dataTestId: "icon-NoBattery",
    },
    {
      batteryLevel: 0.1,
      dataTestId: "icon-VeryLowBattery",
    },
    {
      batteryLevel: 0.21,
      dataTestId: "icon-LowBattery",
    },
    {
      batteryLevel: 0.41,
      dataTestId: "icon-MediumBattery",
    },
    {
      batteryLevel: 0.61,
      dataTestId: "icon-HighBattery",
    },
    {
      batteryLevel: 0.9,
      dataTestId: "icon-VeryHighBattery",
    },
  ]
  testScenario.forEach(({ batteryLevel, charging = false, dataTestId }) => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    test(`batteryLevel: ${batteryLevel}, charging ${charging}, dataTestId: ${dataTestId}`, () => {
      const { getByTestId } = renderWithThemeAndIntl(
        <BatteryIcon
          level={batteryLevel}
          charging={charging}
          deviceType={DeviceType.MuditaPure}
        />
      )
      expect(getByTestId(dataTestId)).toBeInTheDocument()
    })
  })
})
