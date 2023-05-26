/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EligibleFormat } from "App/files-manager/constants/eligible-format.constant"

export const checkFilesExtensions = (filesPaths: string[]): boolean => {
  return filesPaths.every((filePath) => {
    return (Object.values(EligibleFormat) as string[]).includes(
      (filePath.split(".").pop() ?? "").toLocaleLowerCase()
    )
  })
}
