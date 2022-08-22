/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DiskSpaceCategory } from "App/files-manager/components/files-manager/files-manager.interface"
import { DiskSpaceCategoryType } from "App/files-manager/constants/files-manager.enum"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export const filesSummaryElements: DiskSpaceCategory[] = [
  {
    type: DiskSpaceCategoryType.Music,
    color: "#E3F3FF",
    icon: IconType.MenuMusic,
    label: intl.formatMessage({
      id: "component.filesManagerSummaryMusic",
    }),
    size: 0,
  },
  {
    type: DiskSpaceCategoryType.OtherSpace,
    color: "#F8EBD2",
    icon: IconType.FilesManager,
    label: intl.formatMessage({
      id: "component.filesManagerSummaryOtherSpace",
    }),
    size: 0,
  },
  {
    type: DiskSpaceCategoryType.System,
    color: "#DFEFDE",
    icon: IconType.MuditaLogo,
    label: intl.formatMessage({
      id: "component.filesManagerSummarySystem",
    }),
    size: 0,
  },
  {
    type: DiskSpaceCategoryType.Free,
    color: "#F4F5F6",
    icon: IconType.Cloud,
    label: intl.formatMessage({
      id: "component.filesManagerSummaryFree",
    }),
    size: 0,
  },
]
