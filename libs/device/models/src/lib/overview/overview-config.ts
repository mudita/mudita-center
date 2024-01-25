/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "Libs/generic-view/utils/src"

interface DetailListTextConfig {
  dataKey: string
  type: "detail-list-text"
  title: string
}

interface DetailListModalConfig {
  dataKey: string
  type: "detail-list-modal"
  title: string
  buttonText: string
}

type DetailListFieldConfig = DetailListTextConfig | DetailListModalConfig

interface UpdateTileConfig {
  title: string
  dataKey: string
  type: "mc-overview-update"
  currentVersionKey: string
  showBadge: boolean
}

type DataSyncKey = "currentDateISO" | "timezone"

interface DataSyncTileConfig {
  title: string
  type: "mc-overview-update"
  buttonText: string
  fieldsToSync: Array<DataSyncKey>
}

interface IconTextRowConfig {
  dataKey: string
  type: "icon-text"
}

type TileListFieldConfig = IconTextRowConfig

export interface TileListConfig {
  title?: string
  type: "tile-list"
  dataKey: string
  fields: Array<TileListFieldConfig>
}

type OverviewSectionsConfig =
  | TileListConfig
  | UpdateTileConfig
  | DataSyncTileConfig

export interface OverviewConfig {
  title: string
  summary: {
    show?: boolean
    showImg?: boolean //default true
    imgVariant?: string
    showSerialNumber?: boolean //default true
    serialNumberLabel?: string
    showAbout?: boolean //default false
    aboutTitle?: string //default defined by translation
    aboutSubtitle?: string
    aboutIcon?: IconType
    aboutFields?: Array<DetailListFieldConfig> //default []
    sections?: Array<OverviewSectionsConfig> //default []
  }
  sections?: Array<OverviewSectionsConfig> //default []
}
