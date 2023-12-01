/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { eligibleFormat } from "App/files-manager/constants/eligible-format.constant"

export const checkFilesExtensions = (
  filesPaths: string[]
): { validFiles: string[]; invalidFiles: string[] } => {
  const isPathEligible = (path: string) =>
    eligibleFormat.includes((path.split(".").pop() ?? "").toLocaleLowerCase())
  const validFiles = filesPaths.filter((filePath) => isPathEligible(filePath))
  const invalidFiles = filesPaths.filter(
    (filePath) => !isPathEligible(filePath)
  )

  return { validFiles, invalidFiles }
}
