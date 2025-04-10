/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ObjectInfo } from "./object-info.interface"
import { parseTextFields } from "./parse-text-fields"
import {
  getObjectFormatExtension,
  mapAssociationType,
  mapProtectionStatus,
} from "./object-format.helpers"

export function parseObjectInfo(buffer: ArrayBuffer): ObjectInfo {
  const bytes = new DataView(buffer)

  const storageID = bytes.getUint32(0, true)
  const objectFormatRaw = bytes.getUint16(4, true)
  const protectionStatusRaw = bytes.getUint16(6, true)
  const objectCompressedSize = bytes.getUint32(8, true)
  const thumbFormat = bytes.getUint16(12, true)
  const thumbCompressedSize = bytes.getUint32(14, true)
  const thumbPixWidth = bytes.getUint32(18, true)
  const thumbPixHeight = bytes.getUint32(22, true)
  const imagePixWidth = bytes.getUint32(26, true)
  const imagePixHeight = bytes.getUint32(30, true)
  const imageBitDepth = bytes.getUint32(34, true)
  const parentObject = bytes.getUint32(38, true)
  const associationTypeRaw = bytes.getUint16(42, true)
  const associationDesc = bytes.getUint32(44, true)
  const sequenceNumber = bytes.getUint32(48, true)

  const objectFormat = getObjectFormatExtension(objectFormatRaw)
  const protectionStatus = mapProtectionStatus(protectionStatusRaw)
  const associationType = mapAssociationType(associationTypeRaw)

  const testFieldKeys = [
    "filename",
    "dateCreated",
    "dateModified",
    "keywords",
  ] as const
  const textFields = parseTextFields(buffer, testFieldKeys, 52)

  return {
    storageID,
    objectFormat,
    protectionStatus,
    objectCompressedSize,
    thumbFormat,
    thumbCompressedSize,
    thumbPixWidth,
    thumbPixHeight,
    imagePixWidth,
    imagePixHeight,
    imageBitDepth,
    parentObject,
    associationType,
    associationDesc,
    sequenceNumber,
    ...textFields,
  }
}
