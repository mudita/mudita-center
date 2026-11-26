/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  McOverviewConfigResponse,
  McOverviewDataResponse,
} from "devices/api-device/models"
import { mapOverviewFeature } from "./overview-mapper"

const baseConfig: McOverviewConfigResponse = {
  title: "Overview",
  summary: {
    show: true,
    showImg: true,
    imgVariant: "black",
    showSerialNumber: true,
    serialNumberLabel: "Serial number",
  },
  sections: [
    {
      title: "Status",
      dataKey: "status",
      type: "tile-list",
      fields: [{ dataKey: "battery", type: "icon-text" }],
    },
  ],
}

const baseData: McOverviewDataResponse = {
  summary: { about: { serialNumber: { text: "SN123" } } },
  sections: {
    battery: {
      icon: "battery-4",
      text: "73%",
      subText: "Charger disconnected",
      show: true,
    },
  },
}

const updateSection = (showBadge: boolean) =>
  ({
    title: "Firmware",
    dataKey: "update",
    type: "mc-overview-update",
    currentVersionKey: "version",
    showBadge,
    versionLabel: "Current version:",
  }) as const

const dataWithUpdate: McOverviewDataResponse = {
  ...baseData,
  sections: {
    ...baseData.sections,
    update: { text: "1.0.0", badgeText: "Update available" },
  },
}

describe("mapOverviewFeature", () => {
  it("maps summary and battery status", () => {
    const result = mapOverviewFeature(baseData, baseConfig)

    expect(result.summary).toEqual({
      imgVariant: "black",
      serialNumber: { label: "Serial number", value: "SN123" },
    })
    expect(result.status?.fields).toEqual([
      { icon: "battery-4", text: "73%", subText: "Charger disconnected" },
    ])
  })

  it("does not map the update section when the device does not provide it", () => {
    const result = mapOverviewFeature(baseData, baseConfig)

    expect(result.update).toBeUndefined()
  })

  it("maps the firmware version and update status badge", () => {
    const config = {
      ...baseConfig,
      sections: [...(baseConfig.sections ?? []), updateSection(true)],
    }

    const result = mapOverviewFeature(dataWithUpdate, config)

    expect(result.update).toEqual({
      title: "Firmware",
      version: { label: "Current version:", value: "1.0.0" },
      badgeText: "Update available",
    })
  })

  it("skips the update status badge when the device disables it", () => {
    const config = {
      ...baseConfig,
      sections: [...(baseConfig.sections ?? []), updateSection(false)],
    }

    const result = mapOverviewFeature(dataWithUpdate, config)

    expect(result.update).toEqual({
      title: "Firmware",
      version: { label: "Current version:", value: "1.0.0" },
    })
  })
})
