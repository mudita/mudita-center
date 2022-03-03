/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import fs from "fs"
import { mergeToSingleFileString } from "App/main/utils/merge-to-single-file-string/merge-to-single-file-string"

const cwd = path.join(__dirname, "./data")

describe("`mergeToSingleFileString` functionality", () => {
  test("returns length value properly ", () => {
    const file = mergeToSingleFileString({
      cwd,
    })

    expect(file.length).toEqual(3003)
  })

  test("returns files dived by divider properly", () => {
    const file = mergeToSingleFileString({
      cwd,
      fileNameDivider: true,
    })

    expect(file).toContain("========== mc-2022-02-23-1kb.txt ==========")
  })

  test("filters files via `fileNameRegExp` works properly", () => {
    const file = mergeToSingleFileString({
      cwd,
      fileNameRegExp: /^mc-.*\.txt$/,
    })
    expect(file.length).toEqual(2002)
  })

  test("truncate returned value via `maxSize` properly", () => {
    const file = mergeToSingleFileString({
      cwd,
      fileNameRegExp: /^mc-.*\.txt$/,
      maxSize: 1000,
    })
    expect(file.length).toEqual(1000)
  })

  test("truncate value is a return from the latest file", () => {
    const latestFileBuffer = fs.readFileSync(
      path.join(cwd, "mc-2022-02-23-1kb.txt")
    )
    const file = mergeToSingleFileString({
      cwd,
      fileNameRegExp: /^mc-.*\.txt$/,
      maxSize: 1000,
    })
    expect(file).toEqual(latestFileBuffer.toString())
  })
})
