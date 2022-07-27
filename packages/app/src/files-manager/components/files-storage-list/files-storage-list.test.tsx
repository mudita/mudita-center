/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"
import { File } from "App/files-manager/dto"
import FilesStorageList from "App/files-manager/components/files-storage-list/files-storage-list.component"
import { FilesStorageListTestIds } from "App/files-manager/components/files-storage-list/files-storage-list-test-ids.enum"

type Props = ComponentProps<typeof FilesStorageList>

const defaultProps: Props = {
  resultState: ResultState.Empty,
  files: [],
}

const files: File[] = [
  {
    id: "user/music/example_file_name.mp3",
    size: 1234,
    name: "example_file_name.mp3",
    type: "mp3",
  },
  {
    id: "user/music/second_example_file_name.wav",
    size: 12345,
    name: "second_example_file_name.wav",
    type: "wav",
  },
]

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<FilesStorageList {...props} />)
}

describe("`FilesStorageList` component", () => {
  test("Empty files storage is rendered as default state", () => {
    const { queryByTestId } = render()
    expect(queryByTestId(FilesStorageListTestIds.Empty)).toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loaded)
    ).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Error)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loading)
    ).not.toBeInTheDocument()
  })

  test("Error info is rendered if resultState is equal to Error", () => {
    const { queryByTestId } = render({ resultState: ResultState.Error })
    expect(queryByTestId(FilesStorageListTestIds.Error)).toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Empty)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loaded)
    ).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loading)
    ).not.toBeInTheDocument()
  })

  test("Loading component is rendered if resultState is Loading", () => {
    const { queryByTestId } = render({
      resultState: ResultState.Loading,
    })
    expect(queryByTestId(FilesStorageListTestIds.Loading)).toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Empty)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loaded)
    ).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Error)).not.toBeInTheDocument()
  })

  test("No results is rendered if resultState is Loaded and files list is empty", () => {
    const { queryByTestId } = render({ resultState: ResultState.Loaded })
    expect(queryByTestId(FilesStorageListTestIds.Empty)).toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loaded)
    ).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Error)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loading)
    ).not.toBeInTheDocument()
  })

  test("Files storage list is rendered if resultState is Loaded and files list isn't empty", () => {
    const { queryByTestId, queryAllByTestId } = render({
      resultState: ResultState.Loaded,
      files,
    })
    expect(queryAllByTestId(FilesStorageListTestIds.Row)[0]).toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Loaded)).toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Empty)).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageListTestIds.Error)).not.toBeInTheDocument()
    expect(
      queryByTestId(FilesStorageListTestIds.Loading)
    ).not.toBeInTheDocument()
  })
})
