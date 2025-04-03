/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getUint64 } from "./get-uint-64"
import { parseTextFields } from "./parse-text-fields"

export interface ResponseStorageInfo {
  storageType: number
  filesystemType: number
  accessCapability: number
  maxCapacity: number
  freeSpaceInBytes: number
  freeSpaceInObjects: number
  storageDescription: string
  volumeLabel: string
}

export const parseStorageInfo = (buffer: ArrayBuffer): ResponseStorageInfo => {
  const bytes = new DataView(buffer)

  const testFieldKeys = ["storageDescription", "volumeLabel"] as const
  const textFields = parseTextFields(buffer, testFieldKeys, 26)

  return {
    ...textFields,
    storageType: bytes.getUint16(0, true),
    filesystemType: bytes.getUint16(2, true),
    accessCapability: bytes.getUint16(4, true),
    maxCapacity: getUint64(bytes, 6, true),
    freeSpaceInBytes: getUint64(bytes, 14, true),
    freeSpaceInObjects: bytes.getUint32(22, true),
  }
}
