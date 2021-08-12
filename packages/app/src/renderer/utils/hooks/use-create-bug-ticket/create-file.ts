/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import path from "path"

const createFile = (filePath: string): File => {
  const { mtimeMs: lastModified } = fs.statSync(filePath)
  return new File([fs.readFileSync(filePath)], path.basename(filePath), {
    lastModified,
    type: "application/zip",
  })
}

export default createFile
