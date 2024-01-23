/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type IconType =
  | "arrow"
  | "ArrowLongLeft"
  | "battery1"
  | "no-signal"
  | "lte"
  | "device"
  | "phone-about"

interface DetailListTextConfig {
  key: string
  type: "detail-list-text"
  title: string
}

interface DetailListModalConfig {
  key: string
  type: "detail-list-modal"
  title: string
  buttonText: string
}

type DetailListFieldConfig = DetailListTextConfig | DetailListModalConfig

interface UpdateTileConfig {
  title: string
  key: string
  type: "mc-overview-update"
  currentVersionKey: string
  showBadge: boolean
}

interface IconTextRowConfig {
  key: string
  type: "icon-text"
}

type TileListFieldConfig = IconTextRowConfig

interface TileListConfig {
  title?: string
  type: "tile-list"
  key: string
  fields: Array<TileListFieldConfig>
}

type OverviewSectionsConfig = TileListConfig | UpdateTileConfig

export interface OverviewConfig {
  title: string
  summary: {
    show: boolean
    showImg?: boolean
    imgVariant?: string
    showSerialNumber?: boolean
    serialNumberLabel?: string
    showAbout?: boolean
    aboutTitle?: string
    aboutSubtitle?: string
    aboutIcon?: IconType
    aboutFields?: Array<DetailListFieldConfig>
  }
  sections: Array<OverviewSectionsConfig>
}
