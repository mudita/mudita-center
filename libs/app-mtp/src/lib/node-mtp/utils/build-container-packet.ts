/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContainerCode, ContainerTypeCode } from "../mtp-packet-definitions"
import { convertTextEncoding } from "./convert-text-encoding"

export interface PayloadItemBase {
  name?: string
}

export interface PayloadItemString extends PayloadItemBase {
  value: string
  type: "UTF16le"
}

export interface PayloadItemNumber extends PayloadItemBase {
  value: number
  type: "UINT32" | "UINT16" | "UINT8"
}

export type RequestPayloadItem = PayloadItemString | PayloadItemNumber

export interface RequestContainerPacket {
  transactionId: number
  type: ContainerTypeCode
  code: ContainerCode
  payload?: RequestPayloadItem[]
  fixSize?: number
}

export function buildContainerPacket(
  container: RequestContainerPacket,
  maxBufferSize = 512
): ArrayBuffer {
  container.payload = container.payload || []

  let currentPacketLength = 12
  const buffer = new ArrayBuffer(maxBufferSize)
  const bytes = new DataView(buffer)

  bytes.setUint32(0, currentPacketLength, true)
  bytes.setUint16(4, container.type, true)
  bytes.setUint16(6, container.code, true)
  bytes.setUint32(8, container.transactionId, true)

  container.payload.forEach((item: RequestPayloadItem) => {
    if (item.type === "UINT32") {
      bytes.setUint32(currentPacketLength, item.value, true)
      currentPacketLength += 4
    } else if (item.type === "UINT16") {
      bytes.setUint16(currentPacketLength, item.value, true)
      currentPacketLength += 2
    } else if (item.type === "UINT8") {
      bytes.setUint8(currentPacketLength, item.value)
      currentPacketLength += 1
    } else if (item.type === "UTF16le") {
      const utf16Buffer = convertTextEncoding(item.value, "utf-8", "utf16le")

      const nullTerminatorSize = 1
      const stringLength = item.value.length + nullTerminatorSize

      let offset = currentPacketLength

      bytes.setUint8(offset++, stringLength)

      const utf16Bytes = new Uint8Array(utf16Buffer)
      utf16Bytes.forEach((byte) => bytes.setUint8(offset++, byte))

      bytes.setUint16(offset, 0, true)

      currentPacketLength = offset += 2
    } else {
      throw new Error(`Unsupported type for item: ${JSON.stringify(item)}`)
    }
  })

  const packetLength = container.fixSize ?? currentPacketLength
  bytes.setUint32(0, packetLength, true)

  return buffer.slice(0, currentPacketLength)
}
