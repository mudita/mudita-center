/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import {
  ObjectFormatCode,
  ObjectFormatExtension,
} from "./object-format.interface"

export const generateMaps = () => {
  const extensionToCodeMap = {} as Record<
    ObjectFormatExtension,
    ObjectFormatCode
  >
  const codeToExtensionMap = {} as Record<
    ObjectFormatCode,
    ObjectFormatExtension
  >

  for (const key in ObjectFormatExtension) {
    const extension =
      ObjectFormatExtension[key as keyof typeof ObjectFormatExtension]
    const code =
      ObjectFormatCode[
        extension.slice(1).toUpperCase() as keyof typeof ObjectFormatCode
      ]

    extensionToCodeMap[extension] = code
    codeToExtensionMap[code] = extension
  }

  return { extensionToCodeMap, codeToExtensionMap }
}

const { extensionToCodeMap, codeToExtensionMap } = generateMaps()

const undefinedObjectFormat = 0x3000

export const getObjectFormat = (name: string): number => {
  const extension = path
    .extname(name)
    .slice(1)
    .toLowerCase() as ObjectFormatExtension
  return extensionToCodeMap[extension] || undefinedObjectFormat
}

export const getObjectFormatExtension = (
  code: ObjectFormatCode
): ObjectFormatExtension | undefined => {
  return codeToExtensionMap[code]
}
