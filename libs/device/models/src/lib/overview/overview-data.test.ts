/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType, View } from "generic-view/utils"
import { OverviewDataValidator } from "./overview-data"

const overviewConfig = {
  main: {
    component: "block-plain",
  },
  battery: {
    component: "icon-text",
  },
  network: {
    component: "icon-text",
  },
} as unknown as View

const aboutConfig = {
  main: {
    component: "block-plain",
  },
  imei: {
    component: "about-data-box",
  },
  "sarmodal-content": {
    component: "text-formatted",
  },
} as unknown as View

const minimumData = {
  summary: {
    about: {
      imei: {
        text: "imei-text",
      },
      sar: {
        text: "sar-text",
      },
    },
  },
  sections: {
    battery: {
      icon: IconType.AirplaneMode,
      text: "battery-text",
    },
    network: {
      icon: IconType.AirplaneMode,
      text: "battery-text",
    },
  },
}

describe("OverviewDataValidator", () => {
  it("should return success when correct config is validated", () => {
    const dataToParse = { ...minimumData }
    const validator = OverviewDataValidator(overviewConfig, aboutConfig)
    const result = validator.safeParse(dataToParse)
    expect(result.success).toBeTruthy()
  })
  it("should return fail when about data is missing", () => {
    const dataToParse: any = { ...minimumData }
    delete dataToParse.summary.about.imei
    const validator = OverviewDataValidator(overviewConfig, aboutConfig)
    const result = validator.safeParse(dataToParse)
    expect(result.success).toBeFalsy()
  })
  it("should return fail when summary data is missing", () => {
    const dataToParse: any = { ...minimumData }
    delete dataToParse.sections.network
    const validator = OverviewDataValidator(overviewConfig, aboutConfig)
    const result = validator.safeParse(dataToParse)
    expect(result.success).toBeFalsy()
  })
})
