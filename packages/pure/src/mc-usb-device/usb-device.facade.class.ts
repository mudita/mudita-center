/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum EndpointCode {
  OpenSession = 0x1002,
  CloseSession = 0x1003,
  GetObjectHandles = 0x1007,
}

export enum USBDataType {
  CommandBlock = 1,
  DataBlock,
  ResponseBlock,
  EventBlock,
}

export interface UsbResponse {
  type: USBDataType
  code: EndpointCode
  id: number
  payload: ArrayBuffer
}

export interface WriteOption {
  type: USBDataType
  code: EndpointCode
  id: number
  payload: any[]
}

export interface UsbDeviceFacadeClass {
  write(option: WriteOption): Promise<any | undefined>
  readData(): Promise<UsbResponse | undefined>
  openSession(id: WriteOption["id"]): Promise<boolean | undefined>
  closeSession(id: WriteOption["id"]): Promise<boolean | undefined>
}
