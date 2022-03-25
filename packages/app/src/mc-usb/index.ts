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
