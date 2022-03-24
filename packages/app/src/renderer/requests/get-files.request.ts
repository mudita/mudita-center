/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  File as musicFile,
  FileType,
} from "App/files-manager/reducers/files-manager.interface"

const getFiles = async (): Promise<musicFile[]> => {
  const data: musicFile[] = [
    {
      id: "1",
      size: 1234,
      name: "example_file_name",
      type: FileType.mp3,
    },
    {
      id: "2",
      size: 12345,
      name: "second_example_file_name",
      type: FileType.wav,
    },
  ]
  return Promise.resolve(data)
}

export default getFiles
