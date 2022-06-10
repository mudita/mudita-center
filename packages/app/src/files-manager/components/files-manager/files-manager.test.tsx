/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import FilesManager from "App/files-manager/components/files-manager/files-manager.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"

const defaultProps: ComponentProps<typeof FilesManager> = {
  memorySpace: {
    free: 62914560,
    full: 104857600,
    total: 16000000000,
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
