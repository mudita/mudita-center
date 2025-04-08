/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface ObjectInfoDataset {
  storageID: number
  objectFormat: number
  protectionStatus: number
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
