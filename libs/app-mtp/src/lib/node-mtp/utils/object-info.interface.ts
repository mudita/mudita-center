/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ObjectFormatCode,
  ObjectFormatExtension,
} from "./object-format.interface"

export enum ProtectionStatus {
  NoProtection = "NoProtection",
  ReadOnly = "ReadOnly",
  ReadOnlyData = "ReadOnlyData",
  NonTransferableData = "NonTransferableData",
  Reserved = "Reserved",
}

export interface ObjectInfo {
  storageID: number
  objectFormat: ObjectFormatExtension | undefined
  protectionStatus: ProtectionStatus
  objectCompressedSize: number
  thumbFormat: number
  thumbCompressedSize: number
  thumbPixWidth: number
  thumbPixHeight: number
  imagePixWidth: number
  imagePixHeight: number
  imageBitDepth: number
  parentObject: number
  associationType: number
  associationDesc: number
  sequenceNumber: number
  filename: string
  dateCreated: string
  dateModified: string
  keywords: string
}

export interface ObjectInfoInput
  extends Partial<Omit<ObjectInfo, "objectFormat" | "protectionStatus">> {
  objectFormat: ObjectFormatCode
  protectionStatus: number
  objectCompressedSize: number
  filename: string
}

export interface ResponseObjectInfo extends ObjectInfo {
  objectHandle: number
}
