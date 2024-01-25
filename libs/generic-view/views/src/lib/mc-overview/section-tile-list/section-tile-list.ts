/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TileListConfig } from "device/models"
import { Subview, ViewGenerator } from "generic-view/utils"

export const generateMcOverviewTileListLayout: ViewGenerator<
  TileListConfig,
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
          rowGap: "16px",
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
