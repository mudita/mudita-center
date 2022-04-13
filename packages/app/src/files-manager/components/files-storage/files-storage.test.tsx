/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"
import FilesStorage from "App/files-manager/components/files-storage/files-storage.component"
import { FilesStorageTestIds } from "App/files-manager/components/files-storage/files-storage-test-ids.enum"

type Props = ComponentProps<typeof FilesStorage>

const defaultProps: Props = {
  resultState: ResultState.Empty,
  files: [],
}

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<FilesStorage {...props} />)
}

describe("`Files Storage` component", () => {
  test("should render properly", () => {
    const { queryByTestId } = render()
    expect(queryByTestId(FilesStorageTestIds.Title)).toHaveTextContent(
      "[value] component.filesManagerFilesStorageTitle"
    )
    expect(queryByTestId(FilesStorageTestIds.List)).toBeInTheDocument()
  })
})
