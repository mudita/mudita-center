/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { difference } from "lodash"
import { File } from "Core/files-manager/dto"

export const getUniqueFiles = (
  files: File[] | null,
  filesPaths: string[]
): string[] => {
  const filesNamesFromPaths = filesPaths.map((filePath) => {
    return filePath.split(/\\|\//g).reverse()[0]
  })
  const filesNamesFromFiles =
    files?.map((file) => {
      return file.name
    }) ?? []

  return difference(filesNamesFromPaths, filesNamesFromFiles)
}
