/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import path from "path"

interface mergeToSingleFileOption {
  cwd: string
  fileNameRegExp?: RegExp
  maxSize?: number
  fileNameDivider?: boolean
}

export const mergeToSingleFileString = (
  option: mergeToSingleFileOption
): string => {
  const {
    cwd,
    fileNameRegExp = /\w+/,
    fileNameDivider = false,
    maxSize,
  } = option
  const fileString = fs
    .readdirSync(cwd)
    .filter((fileName) => fileNameRegExp.test(fileName))
    .map((fileName) => ({
      name: fileName,
      time: fs.statSync(path.join(cwd, fileName)).birthtime.getTime(),
    }))
    .sort((a, b) => a.time - b.time)
    .map((file) => file.name)
    .reduce((prev, fileName) => {
      const log = fs.readFileSync(path.join(cwd, fileName), "utf-8")
      const divider = fileNameDivider
        ? `\n========== ${fileName} ==========`
        : ""
      return `${prev}${divider}\n${log}`
    }, "")

  if (maxSize) {
    return fileString.substring(fileString.length - maxSize)
  } else {
    return fileString
  }
}
