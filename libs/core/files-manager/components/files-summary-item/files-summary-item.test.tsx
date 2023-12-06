/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import FilesSummaryItem from "Core/files-manager/components/files-summary-item/files-summary-item.component"
import { renderWithThemeAndIntl } from "Core/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { FilesSummaryItemTestIds } from "Core/files-manager/components/files-summary-item/files-summary-item-test-ids.enum"
import { DiskSpaceCategoryType } from "Core/files-manager/constants"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

const defaultProps: ComponentProps<typeof FilesSummaryItem> = {
  type: DiskSpaceCategoryType.System,
  color: "#DFEFDE",
  icon: IconType.MuditaLogo,
  label: "System",
  size: 1073741824,
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/ban-types
const render = (extraProps?: {}) => {
  return renderWithThemeAndIntl(
    <FilesSummaryItem {...defaultProps} {...extraProps} />
  )
}
describe("FilesSummaryItem", () => {
  test("FilesSummaryItem should render properly", () => {
    const { queryByTestId } = render()
    expect(queryByTestId(FilesSummaryItemTestIds.Wrapper)).toBeInTheDocument()
    expect(queryByTestId(FilesSummaryItemTestIds.Title)).toHaveTextContent(
      "System"
    )
    expect(
      queryByTestId(FilesSummaryItemTestIds.Description)
    ).toHaveTextContent("(1.1 GB)")
  })

  test("FilesSummaryItem should render with filesAmount", () => {
    const { queryByTestId } = render({ filesAmount: 4 })
    expect(
      queryByTestId(FilesSummaryItemTestIds.Description)
    ).toHaveTextContent("[value] component.filesManagerSummaryItemDescription")
  })
})
