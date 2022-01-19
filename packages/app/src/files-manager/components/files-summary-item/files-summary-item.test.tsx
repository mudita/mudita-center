/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React, { ComponentProps } from "react"
import FilesSummaryItem from "App/files-manager/components/files-summary-item/files-summary-item.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { Type } from "Renderer/components/core/icon/icon.config"
import { FilesSummaryItemTestIds } from "App/files-manager/components/files-summary-item/files-summary-item-test-ids.enum"

const defaultProps: ComponentProps<typeof FilesSummaryItem> = {
  filesType: "System",
  color: "#DFEFDE",
  icon: Type.MuditaLogo,
  occupiedMemory: 1024,
}

const render = () => {
  return renderWithThemeAndIntl(<FilesSummaryItem {...defaultProps} />)
}
test("FilesSummaryItem should render properly", () => {
  const { queryByTestId } = render()
  expect(queryByTestId(FilesSummaryItemTestIds.Wrapper)).toBeInTheDocument()
  expect(queryByTestId(FilesSummaryItemTestIds.Title)).toHaveTextContent(
    "System"
  )
})
