/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { File } from "App/files-manager/dto"

export const isFileMatch = (file: File, searchValue: string): boolean => {
  const query: (keyof File)[] = ["name", "type"]
  for (const key of query) {
    const param: typeof file[keyof typeof file] = file[key]
    if (
      param !== undefined &&
      typeof param === "string" &&
      param.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return true
    }
  }
  return false
}
