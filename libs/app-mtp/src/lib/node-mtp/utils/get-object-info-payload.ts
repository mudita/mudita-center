/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestPayloadItem } from "./build-container-packet"
import { ObjectInfoInput } from "./object-info.interface"

export function getObjectInfoPayload({
  storageID = 0,
  objectFormat,
  protectionStatus = 0,
  objectCompressedSize,
  thumbFormat = 0,
  thumbCompressedSize = 0,
  thumbPixWidth = 0,
  thumbPixHeight = 0,
  imagePixWidth = 0,
  imagePixHeight = 0,
  imageBitDepth = 0,
  parentObject = 0,
  associationType = 0,
  associationDesc = 0,
  sequenceNumber = 0,
  filename,
  dateCreated = "",
  dateModified = "",
  keywords = "",
}: ObjectInfoInput): RequestPayloadItem[] {
  return [
    { name: "StorageID", type: "UINT32", value: storageID },
    { name: "ObjectFormat", type: "UINT16", value: objectFormat },
    { name: "ProtectionStatus", type: "UINT16", value: protectionStatus },
    {
      name: "ObjectCompressedSize",
      type: "UINT32",
      value: objectCompressedSize,
    },
    { name: "ThumbFormat", type: "UINT16", value: thumbFormat },
    { name: "ThumbCompressedSize", type: "UINT32", value: thumbCompressedSize },
    { name: "ThumbPixWidth", type: "UINT32", value: thumbPixWidth },
    { name: "ThumbPixHeight", type: "UINT32", value: thumbPixHeight },
    { name: "ImagePixWidth", type: "UINT32", value: imagePixWidth },
    { name: "ImagePixHeight", type: "UINT32", value: imagePixHeight },
    { name: "ImageBitDepth", type: "UINT32", value: imageBitDepth },
    { name: "ParentObject", type: "UINT32", value: parentObject },
    { name: "AssociationType", type: "UINT16", value: associationType },
    { name: "AssociationDesc", type: "UINT32", value: associationDesc },
    { name: "SequenceNumber", type: "UINT32", value: sequenceNumber },
    { name: "Filename", type: "UTF16le", value: filename },
    { name: "DateCreated", type: "UTF16le", value: dateCreated },
    { name: "DateModified", type: "UTF16le", value: dateModified },
    { name: "Keywords", type: "UTF16le", value: keywords },
  ]
}
