/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { intersection } from "lodash"
import { File } from "Core/files-manager/dto"

export const getDuplicatedFiles = (
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

  return intersection(filesNamesFromFiles, filesNamesFromPaths)
}
