/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { ResultState } from "App/files-manager/reducers/files-manager.interface"
import FilesStorage from "App/files-manager/components/files-storage/files-storage.component"
import { FilesStorageTestIds } from "App/files-manager/components/files-storage/files-storage-test-ids.enum"
import {
  MtpFile,
  MtpFileType,
} from "App/files-manager/reducers/files-manager.interface"

type Props = ComponentProps<typeof FilesStorage>

const defaultProps: Props = {
  resultState: ResultState.Empty,
  files: [],
}

const files: MtpFile[] = [
  {
    id: "1",
    size: 1234,
    name: "example_file_name",
    type: MtpFileType.mp3,
  },
  {
    id: "2",
    size: 12345,
    name: "second_example_file_name",
    type: MtpFileType.wav,
  },
]

const render = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<FilesStorage {...props} />)
}

describe("`FilesStorage` component", () => {
  test("Empty files storage is rendered as default state", () => {
    const { getByTestId } = render()
    expect(getByTestId(FilesStorageTestIds.Empty)).toBeInTheDocument()
    expect(getByTestId(FilesStorageTestIds.Loaded)).not.toBeInTheDocument()
    expect(getByTestId(FilesStorageTestIds.Error)).not.toBeInTheDocument()
    expect(getByTestId(FilesStorageTestIds.Loading)).not.toBeInTheDocument()
  })

  test("Error info is rendered if resultState is equal to Error", () => {
    const { queryByTestId } = render({ resultState: ResultState.Error })
    expect(queryByTestId(FilesStorageTestIds.Error)).toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Empty)).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Loaded)).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Loading)).not.toBeInTheDocument()
  })

  test("Loading component is rendered if resultState is Loading", () => {
    const { queryByTestId } = render({
      resultState: ResultState.Loading,
    })
    expect(queryByTestId(FilesStorageTestIds.Loading)).toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Empty)).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Loaded)).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Error)).not.toBeInTheDocument()
  })

  test("No results is rendered if resultState is Loaded and files list is empty", () => {
    const { queryByTestId } = render({ resultState: ResultState.Loaded })
    expect(queryByTestId(FilesStorageTestIds.Empty)).toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Loaded)).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Error)).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Loading)).not.toBeInTheDocument()
  })

  test("Files storage is rendered if resultState is Loaded and files list isn't empty", () => {
    const { queryByTestId, queryAllByTestId } = render({
      resultState: ResultState.Loaded,
      files,
    })
    expect(queryAllByTestId(FilesStorageTestIds.Row)[0]).toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Loaded)).toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Empty)).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Error)).not.toBeInTheDocument()
    expect(queryByTestId(FilesStorageTestIds.Loading)).not.toBeInTheDocument()
  })
})
