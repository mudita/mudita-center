/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  MtpFile,
  MtpFileType,
} from "App/files-manager/reducers/files-manager.interface"

const getFilesRequest = async (): Promise<MtpFile[] | undefined> => {
  const data: MtpFile[] = [
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
  return Promise.resolve(data)
}

export default getFilesRequest
