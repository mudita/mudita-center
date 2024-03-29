/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "./demo-config"

interface DetailListTextData {
  text: string
}

interface DetailListModalData {
  text: string
}

type DetailListFieldData = DetailListTextData | DetailListModalData

interface UpdateTileData {
  version: string
}

interface IconTextRowData {
  icon: IconType
  text: string
  subText?: string
}

type TileListFieldData = IconTextRowData

type TileListData = Record<string, TileListFieldData>

type OverviewSectionsData = TileListData | UpdateTileData

export type OverviewData = Record<string, unknown>

export const overviewData: OverviewData = {
  summary: {
    about: {
      sarText: {
        text: "THE EQUIPMENT MEETS INTERNATIONAL REQUIREMENTS...",
      },
      serialNumber: {
        text: "000111000222003333",
      },
      imei1: {
        text: "000111000222003333",
      },
      imei2: {
        text: "0001110002220033asdasd33",
      },
    },
  },
  sections: {
    status: {
      battery: {
        icon: "battery1",
        text: "23%",
        subText: "Details",
      },
      connection: {
        icon: "no-signal",
        text: "No connection",
      },
      connection2: {
        icon: "lte",
        text: "LTE",
      },
    },
    update: {
      version: "1.2.34",
    },
  },
}
