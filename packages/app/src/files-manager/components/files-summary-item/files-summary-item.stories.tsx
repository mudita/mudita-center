/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import * as React from "react"
import { Router } from "react-router"
import FilesSummaryItem from "App/files-manager/components/files-summary-item/files-summary-item.component"
import history from "Renderer/routes/history"
import { Type } from "Renderer/components/core/icon/icon.config"

const fakeData = {
  filesType: "System",
  color: "#DFEFDE",
  icon: Type.MuditaLogo,
  occupiedMemory: 1024,
}

storiesOf("Components/FilesSummaryItem", module).add("FilesSummaryItem", () => {
  return (
    <Router history={history}>
      <FilesSummaryItem {...fakeData} />
    </Router>
  )
})
