/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import FilesSummaryItem from "App/files-manager/components/files-summary-item/files-summary-item.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { FileType } from "App/files-manager/constants"
import { DiskSpaceCategory } from "App/files-manager/components/files-manager/files-manager.interface"

const fakeData: DiskSpaceCategory = {
  fileType: FileType.UsedSpace,
  color: "#DFEFDE",
  icon: Type.MuditaLogo,
  size: 62914560,
}

storiesOf("Views|Files Manager/FilesSummaryItem", module)
  .add("FilesSummaryItem", () => {
    return <FilesSummaryItem {...fakeData} />
  })
  .add("FilesSummaryItem with filesAmount", () => {
    return <FilesSummaryItem {...fakeData} filesAmount={6} />
  })
