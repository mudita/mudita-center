/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum McUsbFileType {
  unknown = 0,
  undefined = 12288, // 0x3000
  wav = 12296, // 0x3008
  mp3 = 12297, // 0x3009
  flac = 47366, // 0xb906
}

export interface McUsbFile {
  id: string
  size: number
  name: string
  type: McUsbFileType
}
