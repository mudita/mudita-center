/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs, { RmDirOptions } from "fs"

export interface RmdirProps {
  filePath: string
  options: RmDirOptions
}

const rmdir = ({ filePath, options }: RmdirProps): boolean => {
  try {
    if (fs.existsSync(filePath)) {
      fs.rmdirSync(filePath, options)
    }
    return true
  } catch {
    return false
  }
}

export default rmdir
