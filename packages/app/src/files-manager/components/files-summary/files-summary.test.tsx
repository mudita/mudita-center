/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React, { ComponentProps } from "react"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { FilesSummaryTestIds } from "App/files-manager/components/files-summary/files-summary-test-ids.enum"
import { FilesSummaryItemTestIds } from "App/files-manager/components/files-summary-item/files-summary-item-test-ids.enum"
import { Type } from "Renderer/components/core/icon/icon.config"
import { DiskSpaceCategoryType } from "App/files-manager/constants"

const defaultProps: ComponentProps<typeof FilesSummary> = {
  systemMemory: 62914560,
  totalMemorySpace: 104857600,
  diskSpaceCategories: [
    {
      type: DiskSpaceCategoryType.UsedSpace,
      color: "#DFEFDE",
      icon: Type.MuditaLogo,
      label: "Used space",
      size: 41943040,
    },
    {
      type: DiskSpaceCategoryType.Free,
      color: "#F4F5F6",
      icon: Type.Cloud,
      label: "Free",
      size: 62914560,
    },
  ],
}

const render = () => {
  return renderWithThemeAndIntl(<FilesSummary {...defaultProps} />)
}
describe("FilesSummary", () => {
  test("should render properly", () => {
    const { queryByTestId } = render()
    expect(queryByTestId(FilesSummaryTestIds.Wrapper)).toBeInTheDocument()
    expect(queryByTestId(FilesSummaryTestIds.Title)).toHaveTextContent(
      "[value] component.filesManagerSummaryTitle"
    )
  })

  test("correct amount of items should render", () => {
    const { queryAllByTestId } = render()
    expect(queryAllByTestId(FilesSummaryItemTestIds.Wrapper)).toHaveLength(2)
  })
})
