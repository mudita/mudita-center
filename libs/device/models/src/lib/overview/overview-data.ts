/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "Libs/generic-view/utils/src"

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

export interface OverviewData {
  summary?: {
    about?: Record<string, DetailListFieldData>
  }
  sections?: Record<string, OverviewSectionsData>
}
