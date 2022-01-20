/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import tar, { ExtractOptions } from "tar"

export const extract = (
  filePath: string,
  options: ExtractOptions
): Promise<void> => {
  return new Promise((resolve) => {
    fs.createReadStream(filePath)
      .pipe(tar.extract(options))
      .on("end", () => {
        resolve()
      })
  })
}
