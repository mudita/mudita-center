/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"

export interface WriteData {
  data: string | NodeJS.ArrayBufferView
  filePath: string
  fileName: string
}

const writeFile = ({ data, filePath, fileName }: WriteData): boolean => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, {
        recursive: true,
      })
    }
    fs.writeFileSync(`${filePath}/${fileName}`, data)
    return true
  } catch {
    return false
  }
}

export default writeFile
