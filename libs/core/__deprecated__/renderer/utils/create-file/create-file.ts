/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import path from "path"
import mime from "mime-types"

const createFile = (filePath: string, options?: FilePropertyBag): File => {
  const { mtimeMs: lastModified } = fs.statSync(filePath)
  const type = mime.lookup(filePath) || ""

  return new File([fs.readFileSync(filePath)], path.basename(filePath), {
    lastModified,
    type,
    ...options,
  })
}

export default createFile
