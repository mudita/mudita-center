/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { checkFilesExtensions } from "App/files-manager/helpers/check-files-extensions.helper"
import { eligibleFormat } from "App/files-manager/constants/eligible-format.constant"

const supportedFiles = eligibleFormat.map((extension) => `file.${extension}`)

describe("`checkFilesExtensions` helper", () => {
  test("all correct extensions", () => {
    expect(checkFilesExtensions(supportedFiles)).toBeTruthy()
  })

  test("empty files array", () => {
    expect(checkFilesExtensions([])).toBeTruthy()
  })

  test("at least one unsupported extension", () => {
    const unsupportedFiles = [...supportedFiles, "file.unsupported"]
    expect(checkFilesExtensions(unsupportedFiles)).toBeFalsy()
  })
})
