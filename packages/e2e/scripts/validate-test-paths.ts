/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import {
  TestFilesPaths,
  toRelativePath,
} from "../src/test-filenames/consts/test-filenames.const"

// why this file was added? WDIO does not report error when the path to the file is invalid
const allTestPaths = Object.values(TestFilesPaths).map((path) =>
  toRelativePath(path)
)

const invalidPaths = allTestPaths.filter((path) => !fs.existsSync(path))

if (invalidPaths.length > 0) {
  console.error("Invalid test paths found!", invalidPaths)
  throw new Error()
}
