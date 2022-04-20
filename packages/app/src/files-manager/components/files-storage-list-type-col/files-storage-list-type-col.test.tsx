/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { McUsbFile, McUsbFileType } from "@mudita/pure"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import FilesStorageListTypeCol from "App/files-manager/components/files-storage-list-type-col/files-storage-list-type-col"
import { FilesStorageListTypeColTestIds } from "App/files-manager/components/files-storage-list-type-col/files-storage-list-type-col-test-ids.enum"

type Props = ComponentProps<typeof FilesStorageListTypeCol>

const mp3File: McUsbFile = {
  id: "1",
  size: 1234,
  name: "example_file_name.mp3",
  type: McUsbFileType.mp3,
}

const wavFile: McUsbFile = {
  id: "1",
  size: 1234,
  name: "example_file_name.wav",
  type: McUsbFileType.wav,
}

const flacFile: McUsbFile = {
  id: "1",
  size: 1234,
  name: "example_file_name.flac",
  type: McUsbFileType.flac,
}

const undefiledFile: McUsbFile = {
  id: "1",
  size: 1234,
  name: "example_file_name.mp4",
  type: McUsbFileType.undefined,
}

const render = (props: Props) => {
  return renderWithThemeAndIntl(<FilesStorageListTypeCol {...props} />)
}

describe("`FilesStorageListTypeCol` component", () => {
  test("when file type is set to `mp3`, content is rendered properly", () => {
    const { queryByTestId } = render({file: mp3File})
    expect(queryByTestId(FilesStorageListTypeColTestIds.Col)).toHaveTextContent(
      "MP3"
    )
  })
  test("when file type is set to `wav`, content is rendered properly", () => {
    const { queryByTestId } = render({file: wavFile})
    expect(queryByTestId(FilesStorageListTypeColTestIds.Col)).toHaveTextContent(
      "WAV"
    )
  })
  test("when file type is set to `flac`, content is rendered properly", () => {
    const { queryByTestId } = render({file: flacFile})
    expect(queryByTestId(FilesStorageListTypeColTestIds.Col)).toHaveTextContent(
      "FLAC"
    )
  })
  test("when file type is set to `undefined`, content is rendered properly", () => {
    const { queryByTestId } = render({file: undefiledFile})
    expect(queryByTestId(FilesStorageListTypeColTestIds.Col)).toHaveTextContent(
      "-"
    )
  })
})
