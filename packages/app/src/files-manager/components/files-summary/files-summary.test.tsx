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
import { FilesType } from "App/files-manager/constants/files-manager.enum"

const defaultProps: ComponentProps<typeof FilesSummary> = {
  memorySpace: {
    free: 60,
    full: 100,
  },
  data: [
    {
      filesType: FilesType.UsedSpace,
      color: "#DFEFDE",
      icon: Type.MuditaLogo,
      megabyteSize: 1024,
    },
    {
      filesType: FilesType.Free,
      color: "#F4F5F6",
      icon: Type.Cloud,
      megabyteSize: 124,
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
