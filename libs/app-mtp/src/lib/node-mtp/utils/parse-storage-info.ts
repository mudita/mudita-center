/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getUint64 } from "./get-uint-64"
import { parseTextFields } from "./parse-text-fields"

export enum StorageType {
  Undefined = "Undefined",
  FixedROM = "FixedROM",
  RemovableROM = "RemovableROM",
  FixedRAM = "FixedRAM",
  RemovableRAM = "RemovableRAM",
  Reserved = "Reserved",
}

export interface ResponseStorageInfo {
  storageType: StorageType
  filesystemType: number
  accessCapability: number
  maxCapacity: number
  freeSpaceInBytes: number
  freeSpaceInObjects: number
  storageDescription: string
  volumeLabel: string
}

const mapStorageType = (rawValue: number): StorageType => {
  switch (rawValue) {
    case 0x0000:
      return StorageType.Undefined
    case 0x0001:
      return StorageType.FixedROM
    case 0x0002:
      return StorageType.RemovableROM
    case 0x0003:
      return StorageType.FixedRAM
    case 0x0004:
      return StorageType.RemovableRAM
    default:
      return StorageType.Reserved
  }
}

export const parseStorageInfo = (buffer: ArrayBuffer): ResponseStorageInfo => {
  const bytes = new DataView(buffer)

  const testFieldKeys = ["storageDescription", "volumeLabel"] as const
  const textFields = parseTextFields(buffer, testFieldKeys, 26)

  const storageType = mapStorageType(bytes.getUint16(0, true))

  return {
    ...textFields,
    storageType,
    filesystemType: bytes.getUint16(2, true),
    accessCapability: bytes.getUint16(4, true),
    maxCapacity: getUint64(bytes, 6, true),
    freeSpaceInBytes: getUint64(bytes, 14, true),
    freeSpaceInObjects: bytes.getUint32(22, true),
  }
}
