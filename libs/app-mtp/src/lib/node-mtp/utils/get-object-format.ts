/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"

const objectFormats: Record<string, number> = {
  ".txt": 0x3004,
  ".html": 0x3005,
  ".aiff": 0x3007,
  ".wav": 0x3008,
  ".mp3": 0x3009,
  ".avi": 0x300a,
  ".mpeg": 0x300b,
  ".asf": 0x300c,
  ".jpg": 0x3801,
  ".bmp": 0x3804,
  ".png": 0x380b,
  ".gif": 0x3807,
  ".jpeg": 0x3801,
  ".jfif": 0x3808,
  ".cd": 0x3809,
  ".pict": 0x380a,
  ".jp2": 0x380f,
  ".jpx": 0x3810,
  ".mp4": 0xb982,
  ".flac": 0xb906,
  ".aac": 0xb903,
  ".ogg": 0xb902,
  ".wma": 0xb901,
  ".wmv": 0xb981,
  ".mpg": 0xb983,
  ".3gp": 0xb984,
  ".3g2": 0xb985,
  ".avchd": 0xb986,
  ".xml": 0xba82,
  ".doc": 0xba83,
  ".xls": 0xba86,
  ".ppt": 0xba87,
  ".xlsx": 0xba85,
}

const undefinedObjectFormat = 0x3000

export const getObjectFormat = (name: string): number => {
  const ext = path.extname(name).toLowerCase()
  return objectFormats[ext] || undefinedObjectFormat
}
