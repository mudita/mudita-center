/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, View, ViewGenerator } from "generic-view/utils"
import {
  OverviewData,
  ServerAPIDeviceOSVersion,
  UpdateTileConfig,
} from "device/models"
import semver from "semver/preload"

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
        shadow: true,
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
  config?: View,
  updateData?: ServerAPIDeviceOSVersion
) => {
  const updateKey = Object.entries(config || {}).find(([key, item]) => {
    return (
      item.component === "block-box" &&
      item.childrenKeys?.includes(key + UpdateKeys.OSVersion)
    )
  })?.[0]
  const newData = { ...data }
  delete newData?.[updateKey as keyof typeof data]
  const baseUpdateData = data?.[updateKey as keyof typeof data]
  if (updateData && baseUpdateData) {
    let updateAvailable = false
    try {
      updateAvailable = semver.gt(
        semver.coerce(updateData.version)?.raw ?? "",
        semver.coerce(baseUpdateData.version as string)?.raw ?? ""
      )
    } catch {
      console.log("error")
      updateAvailable = false
    }
    if (updateAvailable) {
      return {
        ...newData,
        [updateKey + UpdateKeys.OSVersion]: {
          ...baseUpdateData,
          update: {
            available: true,
            updateVersion: updateData.version,
            updateText: updateData.text,
          },
        },
      }
    }
  }
  return {
    ...newData,
    [updateKey + UpdateKeys.OSVersion]: baseUpdateData,
  }
}
