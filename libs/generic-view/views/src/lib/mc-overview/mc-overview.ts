/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  generateViewConfig,
  MainView,
  View,
  ViewGenerator,
} from "generic-view/utils"
import {
  generateMcOverviewSummaryData,
  generateMcOverviewSummaryLayout,
} from "./summary/summary"
import {
  OverviewConfig,
  OverviewData,
  ServerAPIDeviceOSVersion,
} from "device/models"
import { generateMcOverviewTileListLayout } from "./section-tile-list/section-tile-list"
import {
  generateMcOverviewUpdateData,
  generateMcOverviewUpdateLayout,
} from "./section-update/section-update"
import { generateMcOverviewBackupLayout } from "./section-backup/section-backup"

export const generateMcOverviewLayout: ViewGenerator<OverviewConfig> = (
  config
) => {
  const summary = generateMcOverviewSummaryLayout(config.summary)

  // Push a demo data for backup section
  config.sections?.push({
    type: "mc-overview-backup",
    dataKey: "backup",
    title: "Backup",
    backupFeatures: [
      {
        label: "Contacts list",
        key: "CONTACTS_LIST",
      },
      {
        label: "Call log",
        key: "CALL_LOG",
      },
      {
        label: "Messages",
        key: "MESSAGES",
      },
      {
        label: "Notes",
        key: "notes",
      },
      {
        label: "Calendar events",
        key: "calendar-events",
      },
      {
        label: "OS version & OS Settings",
        key: "os-version",
      },
      {
        label: "App settings: Phone, Messages",
        key: "app-settings",
      },
    ],
    restoreFeatures: [
      {
        label: "Contacts list",
        keys: ["contacts-list"],
      },
      {
        label: "Call log",
        keys: ["call-log"],
      },
    ],
  })

  const sections =
    config.sections?.map((section) => {
      switch (section?.type) {
        case "tile-list":
          return generateMcOverviewTileListLayout(section)
        case "mc-overview-update":
          return generateMcOverviewUpdateLayout(section)
        case "mc-overview-backup":
          return generateMcOverviewBackupLayout(section)
        default:
          return undefined
      }
    }) || []

  const mainConfig: MainView = {
    screenTitle: config.title,
    component: "block-plain",
    layout: {
      padding: "32px",
      gridLayout: {
        rows:
          sections.length === 3
            ? ["auto", 1, 1]
            : ["auto", "minmax(auto, 172px)", 1],
        columns: ["280px", 1],
        columnGap: "32px",
        rowGap: sections.length === 3 ? "20px" : "32px",
      },
      flexPlacement: {
        grow: 1,
      },
    },
  }
  return generateViewConfig(mainConfig, [summary, ...sections])
}

export const generateMcOverviewData = (
  data: OverviewData,
  config?: View,
  updateData?: ServerAPIDeviceOSVersion
) => {
  const summary = generateMcOverviewSummaryData(data.summary)
  const sections = generateMcOverviewUpdateData(
    data.sections,
    config,
    updateData
  )
  return {
    ...summary,
    ...sections,
  }
}
