/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"

export interface WriteData {
  data: string | NodeJS.ArrayBufferView
  cwd: string
  fileName: string
}

const writeFile = ({ data, cwd, fileName }: WriteData): boolean => {
  try {
    if (!fs.existsSync(cwd)) {
      fs.mkdirSync(cwd, {
        recursive: true,
      })
    }
    fs.writeFileSync(`${cwd}/${fileName}`, data)
    return true
  } catch {
    return false
  }
}

export default writeFile
