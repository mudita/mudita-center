/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"

export interface CopyData {
  sourcePath: string
  cwd: string
}

const copyFile = ({ sourcePath, cwd }: CopyData): boolean => {
  try {
    if (!fs.existsSync(cwd)) {
      fs.mkdirSync(cwd, {
        recursive: true,
      })
    }
    fs.copyFileSync(sourcePath, cwd)
    return true
  } catch {
    return false
  }
}

export default copyFile
