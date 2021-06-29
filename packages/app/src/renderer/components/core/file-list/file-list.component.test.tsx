/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { fireEvent } from "@testing-library/react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import FileList from "Renderer/components/core/file-list/file-list.component"
import { FileListTestIds } from "Renderer/components/core/file-list/file-list-test-ids.enum"

type Props = ComponentProps<typeof FileList>
const defaultProps: Props = {
  files: [],
}
const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  const outcome = renderWithThemeAndIntl(<FileList {...props} />)
  return {
    ...outcome,
  }
}

test("component renders properly", () => {
  const { queryByTestId } = render({
    files: [{ name: "mudita.logs" }],
  })

  expect(queryByTestId(FileListTestIds.File)).toBeInTheDocument()
  expect(queryByTestId(FileListTestIds.RemoveFileButton)).toEqual(null)
})

test("component no render any item if files prop is empty", () => {
  const { queryByTestId } = render({ files: [] })
  expect(queryByTestId(FileListTestIds.File)).toEqual(null)
  expect(queryByTestId(FileListTestIds.RemoveFileButton)).toEqual(null)
})

test("component trigger onRemoveClick event properly", () => {
  const onRemoveClick = jest.fn()
  const { queryByTestId } = render({
    onRemoveClick,
    files: [{ name: "mudita.logs" }],
  })
  const removeFileButton = queryByTestId(FileListTestIds.RemoveFileButton)

  expect(queryByTestId(FileListTestIds.File)).not.toEqual(null)
  expect(removeFileButton).not.toEqual(null)

  fireEvent.click(removeFileButton as HTMLElement)

  expect(onRemoveClick).toBeCalled()
})
