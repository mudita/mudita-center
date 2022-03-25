/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUsbFile, McUsbFileType } from "App/mc-usb"

const getFilesRequest = async (): Promise<McUsbFile[] | undefined> => {
  const data: McUsbFile[] = [
    {
      id: "1",
      size: 1234,
      name: "example_file_name",
      type: McUsbFileType.mp3,
    },
    {
      id: "2",
      size: 12345,
      name: "second_example_file_name",
      type: McUsbFileType.wav,
    },
  ]
  return Promise.resolve(data)
}

export default getFilesRequest
