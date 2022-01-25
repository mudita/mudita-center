/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Type } from "Renderer/components/core/icon/icon.config"
import { DiskSpaceCategory } from "App/files-manager/components/files-manager/files-manager.interface"
import { FilesType } from "App/files-manager/constants/files-manager.enum"

export const filesSummaryElements: DiskSpaceCategory[] = [
  // Ready for CP-970
  // {
  //   filesType: FilesType.Music,
  //   color: "#E3F3FF",
  //   icon: Type.MenuMusic,
  //   megabyteSize: 0,
  // },
  {
    filesType: FilesType.UsedSpace,
    color: "#DFEFDE",
    icon: Type.MuditaLogo,
    megabyteSize: 0,
  },
  {
    filesType: FilesType.Free,
    color: "#F4F5F6",
    icon: Type.Cloud,
    megabyteSize: 0,
  },
]
