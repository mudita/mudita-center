/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"

export const splitPathToDirNameAndBaseName = (
  currentPath: string
): [string, string] => {
  const dirName = path.dirname(currentPath)
  const baseName = path.basename(currentPath)
  return [dirName, baseName]
}
