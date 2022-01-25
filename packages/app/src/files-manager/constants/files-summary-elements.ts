/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Type } from "Renderer/components/core/icon/icon.config"
import { Item } from "App/files-manager/components/files-manager/files-manager.interface"
import { FilesType } from "App/files-manager/constants/files-manager.enum"

export const filesSummaryElements: Item[] = [
  {
    filesType: FilesType.Music,
    color: "#E3F3FF",
    icon: Type.MenuMusic,
  },
  {
    filesType: FilesType.UsedSpace,
    color: "#DFEFDE",
    icon: Type.MuditaLogo,
  },
  {
    filesType: FilesType.Free,
    color: "#F4F5F6",
    icon: Type.Cloud,
  },
]
