/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HarmonyFile } from "devices/harmony/models"
import { FileManagerFile } from "devices/common/ui"

import { FileManagerFileMap } from "./harmony-manage-files.types"

export const toFile = (item: HarmonyFile): FileManagerFile => {
  const name = item.path.split("/").reverse()[0]
  const type = name.split(".").reverse()[0].toLocaleLowerCase()

  return {
    name,
    type,
    id: item.path,
    size: item.fileSize,
  }
}
export const mapToFileManagerFileMap = (
  files: HarmonyFile[]
): FileManagerFileMap => {
  const map: FileManagerFileMap = {}
  for (const f of files) {
    const file = toFile(f)
    map[file.id] = file
  }
  return map
}
