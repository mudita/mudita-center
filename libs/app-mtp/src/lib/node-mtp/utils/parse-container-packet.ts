/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ContainerCode,
  containerCodeNames,
  ContainerTypeCode,
  containerTypeNames,
} from "../mtp-packet-definitions"

export interface ResponseContainerPacket {
  type: ContainerTypeCode
  typeName: string
  code: ContainerCode
  codeName: string
  transactionId: number
  payload: ArrayBuffer
}

export const parseContainerPacket = (
  buffer: ArrayBuffer
): ResponseContainerPacket => {
  const bytes = new DataView(buffer)

  return {
    type: bytes.getUint16(4, true),
    typeName: getContainerTypeCodeName(bytes.getUint16(4, true)),
    code: bytes.getUint16(6, true),
    codeName: getContainerCodeName(bytes.getUint16(6, true)),
    transactionId: bytes.getUint32(8, true),
    payload: bytes.buffer.slice(12),
  }
}

const getContainerCodeName = (idx: ContainerCode): string => {
  const name = containerCodeNames[idx]
  return name || `unknown" `
}

const getContainerTypeCodeName = (idx: ContainerTypeCode): string => {
  const name = containerTypeNames[idx]
  return name || `unknown" `
}
