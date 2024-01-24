/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  generateDataConfig,
  generateViewConfig,
  MainView,
  ViewGenerator,
} from "generic-view/utils"
import {
  generateMcOverviewSummaryData,
  generateMcOverviewSummaryLayout,
} from "./summary/summary"
import { OverviewConfig, OverviewData } from "device/models"

export const generateMcOverviewLayout: ViewGenerator<OverviewConfig> = (
  config
) => {
  const mainConfig: MainView = {
    screenTitle: config.title,
    component: "block-plain",
    layout: {
      padding: "32px",
      gridLayout: {
        rows: ["auto", 1, 1],
        columns: ["280px", 1],
        columnGap: "32px",
        rowGap: "32px",
      },
      flexPlacement: {
        grow: 1,
      },
    },
  }
  const summary = generateMcOverviewSummaryLayout(config.summary)
  return generateViewConfig(mainConfig, [summary])
}

const data = {
  summary: {
    about: {
      serialNumber: {
        text: "0123456789ABCDEF",
      },
      imei1: {
        text: "864055030180631",
      },
      imei2: {
        text: "864055030176639",
      },
      deviceMode: {
        text: "Online",
      },
      osVersion: {
        text: "ANDROID 12",
      },
    },
  },
  sections: {
    battery: {
      icon: "battery-charging-5",
      text: "100%",
      subText: "",
    },
    connection: {
      icon: "no-sim-card",
      text: "No SIM",
      subText: "SIM 1 - no network",
    },
    connection2: {
      icon: "no-sim-card",
      text: "No SIM",
      subText: "SIM 2 - no network",
    },
    esim: {
      icon: "no-sim-card",
      text: "No SIM",
      subText: "E SIM - no network",
    },
  },
}

export const generateMcOverviewData = (data: OverviewData) => {
  const summary = generateMcOverviewSummaryData(data.summary)
  return generateDataConfig([summary])
}
