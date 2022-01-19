/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Type } from "Renderer/components/core/icon/icon.config"

interface Item {
  filesType: string
  filesAmount?: number
  color: string
  icon: Type
  url?: string
  free?: boolean
}

export const filesSummaryElements: Item[] = [
  {
    filesType: "Music",
    color: "#E3F3FF",
    icon: Type.MenuMusic,
  },
  {
    filesType: "Used space",
    color: "#DFEFDE",
    icon: Type.MuditaLogo,
  },
  {
    filesType: "Free",
    color: "#F4F5F6",
    icon: Type.Cloud,
  },
]
