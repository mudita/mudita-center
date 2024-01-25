/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TileListConfig, TileListData } from "device/models"
import { Subview, ViewGenerator } from "generic-view/utils"

type OverviewTileListConfig = TileListConfig

export const generateMcOverviewTileListLayout: ViewGenerator<
  OverviewTileListConfig,
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
          row: 1,
          column: 2,
          width: 1,
          height: 1,
        },
        flexLayout: {
          direction: "column",
          rowGap: "10px",
        },
      },
      childrenKeys: config.fields.map((field) => field.dataKey),
    },
    ...config.fields.reduce((acc, field) => {
      acc[field.dataKey] = {
        component: field.type,
      }
      return acc
    }, {} as NonNullable<Subview>),
  }
}

export const generateMcOverviewTileListData = (data: TileListData) => {
  return data
}

const config = {
  status: {
    component: "block-box",
    config: {
      title: "Status",
    },
    layout: {
      gridPlacement: {
        row: 1,
        column: 2,
        width: 1,
        height: 1,
      },
      flexLayout: {
        direction: "column",
        rowGap: "10px",
      },
    },

    childrenKeys: ["battery", "connection"],
  },
  battery: {
    component: "icon-text",
  },
  connection: {
    component: "icon-text",
    layout: {
      flexPlacement: {
        grow: 1,
      },
    },
  },
  update: {
    component: "block-box",
    config: {
      title: "Android OS",
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
    childrenKeys: ["version"],
  },
  version: {
    component: "overview-os-version",
    config: {
      versionLabel: "Current version:",
    },
  },
}
