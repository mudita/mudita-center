/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import {
  ObjectFormatCode,
  ObjectFormatExtension,
} from "./object-format.interface"
import {
  AssociationType,
  ObjectInfo,
  ProtectionStatus,
} from "./object-info.interface"

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

export const getObjectFormat = (name: string): ObjectFormatCode => {
  const extension = path
    .extname(name)
    .slice(1)
    .toLowerCase() as ObjectFormatExtension
  return extensionToCodeMap[extension] ?? ObjectFormatCode.Undefined
}

export const getObjectFormatExtension = (
  code: ObjectFormatCode
): ObjectFormatExtension => {
  return codeToExtensionMap[code] ?? ObjectFormatExtension.Undefined
}

export const mapProtectionStatus = (rawValue: number): ProtectionStatus => {
  switch (rawValue) {
    case 0x0000:
      return ProtectionStatus.NoProtection
    case 0x0001:
      return ProtectionStatus.ReadOnly
    case 0x8002:
      return ProtectionStatus.ReadOnlyData
    case 0x8003:
      return ProtectionStatus.NonTransferableData
    default:
      return ProtectionStatus.Reserved
  }
}

export const mapAssociationType = (rawValue: number): AssociationType => {
  switch (rawValue) {
    case 0x0001:
      return AssociationType.Image
    case 0x0002:
      return AssociationType.Video
    case 0x0003:
      return AssociationType.Audio
    case 0x0004:
      return AssociationType.Text
    case 0x0005:
      return AssociationType.Document
    case 0x0006:
      return AssociationType.Hardware
    case 0x0007:
      return AssociationType.Application
    default:
      return AssociationType.Undefined
  }
}

export const isObjectCatalog = ({ objectFormat }: ObjectInfo): boolean =>
  objectFormat === ObjectFormatExtension.Association ||
  objectFormat === ObjectFormatExtension.Undefined
