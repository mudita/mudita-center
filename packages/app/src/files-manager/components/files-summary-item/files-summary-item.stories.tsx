/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import FilesSummaryItem from "App/files-manager/components/files-summary-item/files-summary-item.component"
import { DiskSpaceCategoryType } from "App/files-manager/constants"
import { DiskSpaceCategory } from "App/files-manager/components/files-manager/files-manager.interface"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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
