/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface McUsbFile {
  id: string
  size: number
  name: string
  type: McUsbFileType
}

export enum McUsbFileType {
  wav = 0x3008,
  mp3 = 0x3009,
  flac = 0xb906,
}

export interface McUsbDevice {
  getFiles: () => Promise<McUsbFile[]>
}

export const device: McUsbDevice = {
  getFiles: () => {
    return Promise.resolve([
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
    ])
  },
}
