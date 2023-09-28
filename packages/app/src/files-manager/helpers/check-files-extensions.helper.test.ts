/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { checkFilesExtensions } from "App/files-manager/helpers/check-files-extensions.helper"
import { eligibleFormat } from "App/files-manager/constants/eligible-format.constant"

const supportedFiles = eligibleFormat.map((extension) => `file.${extension}`)

describe("`checkFilesExtensions` helper", () => {
  test("all correct extensions", () => {
    expect(checkFilesExtensions(supportedFiles)).toEqual({
      validFiles: supportedFiles,
      invalidFiles: [],
    })
  })

  test("empty files array", () => {
    expect(checkFilesExtensions([])).toEqual({
      validFiles: [],
      invalidFiles: [],
    })
  })

  test("at least one unsupported extension", () => {
    const unsupportedFiles = ["file.unsupported"]
    const allFiles = [...supportedFiles, ...unsupportedFiles]
    expect(checkFilesExtensions(allFiles)).toEqual({
      validFiles: supportedFiles,
      invalidFiles: unsupportedFiles,
    })
  })
})
