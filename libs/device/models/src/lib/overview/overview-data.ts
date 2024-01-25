/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "Libs/generic-view/utils/src"

export interface DetailListTextData {
  text: string
}

export interface DetailListModalData {
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

export type TileListData = Record<string, TileListFieldData>

type OverviewSectionsData = TileListData | UpdateTileData

export type AboutData = Record<string, DetailListFieldData>

export interface OverviewData {
  summary?: {
    about?: AboutData
  }
  sections?: Record<string, OverviewSectionsData>
}
