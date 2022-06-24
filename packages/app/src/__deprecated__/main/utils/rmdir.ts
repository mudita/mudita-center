/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs, { RmDirOptions } from "fs"

export interface RmdirProps {
  cwd: string
  options: RmDirOptions
}

const rmdir = ({ cwd, options }: RmdirProps): boolean => {
  try {
    if (fs.existsSync(cwd)) {
      fs.rmdirSync(cwd, options)
    }
    return true
  } catch {
    return false
  }
}

export default rmdir
