/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  generateViewConfig,
  IconType,
  MainView,
  ViewGenerator,
} from "generic-view/utils"
import { generateMcOverviewSummaryLayout } from "./summary/summary"
import { OverviewConfig } from "device/models"
import { kompaktImg } from "Root/demo-data/kompakt-img"

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

export const mcOverviewDemoConfig: OverviewConfig = {
  title: "Overview",
  summary: {
    show: true,
    showImg: true,
    imgVariant: "black",
    showSerialNumber: true,
    showAbout: true,
    aboutTitle: "About your device",
    aboutIcon: IconType.Battery1,
    aboutSubtitle: "The details of your phone.",
    aboutFields: [
      {
        dataKey: "serialNumber",
        type: "detail-list-text",
        title: "Serial number",
      },
      {
        dataKey: "sarText",
        type: "detail-list-modal",
        title: "SAR",
        buttonText: "check sar information",
      },
    ],
  },
  sections: [
    {
      title: "Status",
      dataKey: "status",
      type: "tile-list",
      fields: [
        {
          dataKey: "battery",
          type: "icon-text",
        },
        {
          dataKey: "connection",
          type: "icon-text",
        },
      ],
    },
    {
      title: "MuditaOS",
      dataKey: "update",
      type: "mc-overview-update",
      currentVersionKey: "version",
      showBadge: true,
    },
  ],
}

export const mcOverviewDemoData = {
  "device-image": {
    src: kompaktImg,
  },
  "serial-number": {
    text: "6XJMD87764MAXA",
  },
  battery: {
    icon: "battery-1",
    title: "60 %",
    text: "Battery",
  },
  connection: {
    icon: "network-signal-2",
    title: "Network",
    text: "Network name",
  },
  version: {
    version: "Android 13",
    update: {
      available: true,
      text: "Update available (Android 14)",
      actionLabel: "You can update it on your device",
    },
  },
}
