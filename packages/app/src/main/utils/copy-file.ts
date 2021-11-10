/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"

export interface CopyData {
  sourcePath: string
  targetPath: string
}

const copyFile = ({ sourcePath, targetPath }: CopyData): boolean => {
  try {
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, {
        recursive: true,
      })
    }
    fs.copyFileSync(sourcePath, targetPath)
    return true
  } catch {
    return false
  }
}

export default copyFile
