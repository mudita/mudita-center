/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Type } from "Renderer/components/core/icon/icon.config"
import { DiskSpaceCategory } from "App/files-manager/components/files-manager/files-manager.interface"
import { DiskSpaceCategoryType } from "App/files-manager/constants/files-manager.enum"
import { intl } from "Renderer/utils/intl"

export const filesSummaryElements: DiskSpaceCategory[] = [
  // Ready for CP-970
  // {
  //   type: DiskSpaceCategoryType.Music,
  //   color: "#E3F3FF",
  //   icon: Type.MenuMusic,
  // label: intl.formatMessage({
  //   id: "component.filesManagerSummaryMusic",
  // }),
  //   size: 0,
  // },
  {
    type: DiskSpaceCategoryType.UsedSpace,
    color: "#DFEFDE",
    icon: Type.MuditaLogo,
    label: intl.formatMessage({
      id: "component.filesManagerSummaryUsedSpace",
    }),
    size: 0,
  },
  {
    type: DiskSpaceCategoryType.Free,
    color: "#F4F5F6",
    icon: Type.Cloud,
    label: intl.formatMessage({
      id: "component.filesManagerSummaryFree",
    }),
    size: 0,
  },
]
