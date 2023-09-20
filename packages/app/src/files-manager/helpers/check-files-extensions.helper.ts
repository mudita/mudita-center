/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { eligibleFormat } from "App/files-manager/constants/eligible-format.constant"

export const checkFilesExtensions = (
  filesPaths: string[]
): [string[], string[]] => {
  const validFiles = filesPaths.filter((filePath) => {
    return eligibleFormat.includes(
      (filePath.split(".").pop() ?? "").toLocaleLowerCase()
    )
  })
  const invalidFiles = filesPaths.filter((filePath) => {
    return !eligibleFormat.includes(
      (filePath.split(".").pop() ?? "").toLocaleLowerCase()
    )
  })

  return [validFiles, invalidFiles]
}
