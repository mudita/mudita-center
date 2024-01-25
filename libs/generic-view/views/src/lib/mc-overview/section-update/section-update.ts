/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, View, ViewGenerator } from "generic-view/utils"
import { OverviewData, UpdateTileConfig } from "device/models"

enum UpdateKeys {
  OSVersion = "version",
}

export const generateMcOverviewUpdateLayout: ViewGenerator<
  UpdateTileConfig,
  Subview
> = (config) => {
  return {
    [config.dataKey]: {
      component: "block-box",
      config: {
        title: config.title,
      },
      layout: {
        gridPlacement: {
          row: 2,
          column: 2,
          width: 1,
          height: 1,
        },
        flexPlacement: {
          grow: 1,
        },
        flexLayout: {
          direction: "column",
          justifyContent: "space-between",
        },
      },
      childrenKeys: [config.dataKey + UpdateKeys.OSVersion],
    },
    [config.dataKey + UpdateKeys.OSVersion]: {
      component: "overview-os-version",
      config: {
        versionLabel: config.versionLabel,
      },
    },
  }
}

export const generateMcOverviewUpdateData = (
  data: OverviewData["sections"],
  config?: View
) => {
  console.log(data, config)
  const updateKey = Object.entries(config || {}).find(([key, item]) => {
    return (
      item.component === "block-box" &&
      item.childrenKeys?.includes(key + UpdateKeys.OSVersion)
    )
  })?.[0]
  console.log(updateKey)
  return {
    ...data,
    [updateKey + UpdateKeys.OSVersion]: data?.[updateKey as keyof typeof data],
  }
}
