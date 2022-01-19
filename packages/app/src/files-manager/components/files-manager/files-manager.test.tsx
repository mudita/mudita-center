/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import FilesManager from "App/files-manager/components/files-manager/files-manager.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"

const defaultProps: ComponentProps<typeof FilesManager> = {
  memorySpace: {
    full: 100,
    free: 60,
  },
}

const render = () => {
  return renderWithThemeAndIntl(<FilesManager {...defaultProps} />)
}

describe("Files Manager component", () => {
  test("should render properly", () => {
    const { queryByTestId } = render()
    expect(queryByTestId(FilesManagerTestIds.Container)).toBeInTheDocument()
  })
})
