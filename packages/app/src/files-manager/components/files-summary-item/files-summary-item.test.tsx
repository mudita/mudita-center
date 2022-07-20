/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React, { ComponentProps } from "react"
import FilesSummaryItem from "App/files-manager/components/files-summary-item/files-summary-item.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { FilesSummaryItemTestIds } from "App/files-manager/components/files-summary-item/files-summary-item-test-ids.enum"
import { DiskSpaceCategoryType } from "App/files-manager/constants"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const defaultProps: ComponentProps<typeof FilesSummaryItem> = {
  type: DiskSpaceCategoryType.UsedSpace,
  color: "#DFEFDE",
  icon: IconType.MuditaLogo,
  label: "Used space",
  size: 1073741824,
}

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
      "Used space"
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
