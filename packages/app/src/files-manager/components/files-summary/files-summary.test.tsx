/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { FilesSummaryTestIds } from "App/files-manager/components/files-summary/files-summary-test-ids.enum"
import { FilesSummaryItemTestIds } from "App/files-manager/components/files-summary-item/files-summary-item-test-ids.enum"
import { DiskSpaceCategoryType } from "App/files-manager/constants"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const defaultProps: ComponentProps<typeof FilesSummary> = {
  usedMemory: 62914560,
  totalMemorySpace: 104857600,
  diskSpaceCategories: [
    {
      type: DiskSpaceCategoryType.System,
      color: "#DFEFDE",
      icon: IconType.MuditaLogo,
      label: "Used space",
      size: 41943040,
    },
    {
      type: DiskSpaceCategoryType.Free,
      color: "#F4F5F6",
      icon: IconType.Cloud,
      label: "Free",
      size: 62914560,
    },
    {
      type: DiskSpaceCategoryType.Music,
      color: "#E3F3FF",
      icon: IconType.MenuMusic,
      label: "Music",
      size: 4560,
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
    expect(queryAllByTestId(FilesSummaryItemTestIds.Wrapper)).toHaveLength(3)
  })

  test("used memory percentage is displayed", () => {
    const { queryByTestId } = render()
    expect(queryByTestId(FilesSummaryTestIds.UsedMemory)).toHaveTextContent(
      "62.9 MB (60%)"
    )
  })

  test("total memory is displayed", () => {
    const { queryByTestId } = render()
    expect(queryByTestId(FilesSummaryTestIds.TotalMemory)).toHaveTextContent(
      "104.9 MB"
    )
  })
})
