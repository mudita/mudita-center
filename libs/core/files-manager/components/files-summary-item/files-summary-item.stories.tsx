/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import FilesSummaryItem from "Core/files-manager/components/files-summary-item/files-summary-item.component"
import { DiskSpaceCategoryType } from "Core/files-manager/constants"
import { DiskSpaceCategory } from "Core/files-manager/components/files-manager-core/files-manager.interface"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

const fakeData: DiskSpaceCategory = {
  type: DiskSpaceCategoryType.System,
  color: "#DFEFDE",
  icon: IconType.MuditaLogo,
  label: "System",
  size: 62914560,
}

storiesOf("Views|Files Manager/FilesSummaryItem", module)
  .add("FilesSummaryItem", () => {
    return <FilesSummaryItem {...fakeData} />
  })
  .add("FilesSummaryItem with filesAmount", () => {
    return <FilesSummaryItem {...fakeData} filesAmount={6} />
  })
