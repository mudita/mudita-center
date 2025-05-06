/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { WebUSBDevice } from "usb"
import { AppError } from "../../../../core/core/errors/app-error"
import { MTPError } from "../app-mtp.interface"
import {
  buildContainerPacket,
  RequestContainerPacket,
} from "./utils/build-container-packet"
import {
  allStorage,
  ContainerCode,
  ContainerTypeCode,
  mtpUploadChunkSize,
  rootObjectHandle,
} from "./mtp-packet-definitions"
import {
  parseContainerPacket,
  ResponseContainerPacket,
} from "./utils/parse-container-packet"
import { getUint32s } from "./utils/get-uint-32s"
import { getObjectInfoPayload } from "./utils/get-object-info-payload"
import { withTimeout } from "./utils/with-timeout"
import { parseStorageInfo, StorageInfo } from "./utils/parse-storage-info"
import { ResponseObjectInfo } from "./utils/object-info.interface"
import { parseObjectInfo } from "./utils/parse-object-info"
import { ObjectFormatCode } from "./utils/object-format.interface"

export interface UploadFileInfoOptions {
  size: number
  name: string
  storageId: number
  parentObjectHandle: number
  objectFormat: ObjectFormatCode
}

const PREFIX_LOG = `[app-mtp/node-mtp-device]`

export class NodeMtpDevice {
  public id: string = ""
  private packetSize = mtpUploadChunkSize
  private uploadTransactionId: number | null = null
  private transactionIdCounter = 0

  constructor(private device: WebUSBDevice) {
    this.id = String(this.device.serialNumber)
  }

  async initialize() {
    await this.openDevice()
    await this.claimInterface()
    await this.openSession()
  }

  async getStorageIds(): Promise<number[]> {
    console.log(`${PREFIX_LOG} getStorageIds...`)
    const transactionId = this.getTransactionId()

    await this.write({
      transactionId,
      type: ContainerTypeCode.Command,
      code: ContainerCode.GetStorageIds,
    })

    const response = await this.read(transactionId, ContainerTypeCode.Data)

    const [_length, ...storageIds] = getUint32s(response.payload)

    console.log(
      `${PREFIX_LOG} getStorageIds data: ${JSON.stringify(storageIds)}`
    )

    return storageIds
  }

  async getStorageInfo(storageId: number): Promise<StorageInfo> {
    console.log(`${PREFIX_LOG} getStorageInfo...`)
    const transactionId = this.getTransactionId()

    await this.write({
      transactionId,
      type: ContainerTypeCode.Command,
      code: ContainerCode.GetStorageInfo,
      payload: [
        {
          value: storageId,
          type: "UINT32",
        },
      ],
    })

    const response = await this.read(transactionId, ContainerTypeCode.Data)

    const storageInfo = parseStorageInfo(response.payload)
    console.log(
      `${PREFIX_LOG} getStorageInfo via storageId: ${storageId} data: ${JSON.stringify(
        storageInfo
      )}`
    )

    return storageInfo
  }

  async getObjectHandles(
    parentHandle = rootObjectHandle,
    storageID = allStorage,
    formatCode = 0
  ): Promise<number[]> {
    console.log(`${PREFIX_LOG} getObjectHandles...`)
    const transactionId = this.getTransactionId()
    await this.write({
      transactionId,
      type: ContainerTypeCode.Command,
      code: ContainerCode.GetObjectHandles,
      payload: [
        {
          value: storageID,
          type: "UINT32",
        },
        {
          value: formatCode,
          type: "UINT32",
        },
        {
          value: parentHandle,
          type: "UINT32",
        },
      ],
    })

    const response = await this.read(transactionId, ContainerTypeCode.Data)

    const [_length, ...objectHandles] = getUint32s(response.payload)

    console.log(
      `${PREFIX_LOG} getObjectHandles data: ${JSON.stringify(objectHandles)}`
    )

    return objectHandles
  }

  async getObjectInfo(objectHandle: number): Promise<ResponseObjectInfo> {
    console.log(`${PREFIX_LOG} getObjectInfo...`)
    const transactionId = this.getTransactionId()

    await this.write({
      transactionId,
      type: ContainerTypeCode.Command,
      code: ContainerCode.GetObjectInfo,
      payload: [
        {
          value: objectHandle,
          type: "UINT32",
        },
      ],
    })

    const response = await this.read(transactionId, ContainerTypeCode.Data)

    const objectInfo = parseObjectInfo(response.payload)
    const responseObjectInfo = { ...objectInfo, objectHandle }

    console.log(
      `${PREFIX_LOG} getObjectInfo via objectHandle: ${objectHandle} data: ${JSON.stringify(
        responseObjectInfo
      )}`
    )

    return responseObjectInfo
  }

  async uploadFileInfo({
    name,
    size,
    storageId,
    parentObjectHandle,
    objectFormat,
  }: UploadFileInfoOptions): Promise<number> {
    console.log(`${PREFIX_LOG} uploadFileInfo...`)

    const transactionId = this.getTransactionId()

    await this.write({
      transactionId,
      type: ContainerTypeCode.Command,
      code: ContainerCode.SendObjectInfo,
      payload: [
        {
          value: storageId,
          type: "UINT32",
        },
        {
          value: parentObjectHandle,
          type: "UINT32",
        },
      ],
    })

    await this.write({
      transactionId,
      type: ContainerTypeCode.Data,
      code: ContainerCode.SendObjectInfo,
      payload: getObjectInfoPayload({
        objectFormat,
        objectCompressedSize: size,
        filename: name,
        storageID: storageId,
        parentObject: parentObjectHandle,
      }),
    })

    const sendObjectInfoDataResponse = await this.read(transactionId)

    const parameters = getUint32s(sendObjectInfoDataResponse.payload)
    const newObjectID = parameters[2]
    console.log(`${PREFIX_LOG} uploadFileInfo newObjectID: ${newObjectID}`)

    return newObjectID
  }

  async initiateUploadFile(size: number): Promise<void> {
    this.uploadTransactionId = this.getTransactionId()
    console.log(
      `${PREFIX_LOG} initiateUploadFile... transactionId ${this.uploadTransactionId}`
    )
    await this.write({
      transactionId: this.uploadTransactionId,
      type: ContainerTypeCode.Command,
      code: ContainerCode.SendObject,
    })
    await this.write({
      transactionId: this.uploadTransactionId,
      type: ContainerTypeCode.Data,
      code: ContainerCode.SendObject,
      fixSize: size + 12,
    })
  }

  async uploadFileData(chunk: Uint8Array): Promise<void> {
    console.log(`${PREFIX_LOG} uploadFileData...`)
    await this.transferOut(new Uint8Array(chunk).buffer)
  }

  async cancelTransaction(): Promise<void> {
    if (!this.uploadTransactionId) {
      console.log(
        `${PREFIX_LOG} cancelTransaction called without active upload`
      )
      return
    }
    await this.write({
      transactionId: this.uploadTransactionId,
      type: ContainerTypeCode.Event,
      code: ContainerCode.CancelTransaction,
    })
    const response = await this.read(
      this.uploadTransactionId,
      ContainerTypeCode.Response
    )
    this.uploadTransactionId = null
    const expectedStatuses = [
      ContainerCode.GeneralError,
      ContainerCode.TransactionCancelled,
    ]
    if (expectedStatuses.includes(response.code)) {
      console.log(`${PREFIX_LOG} transfer aborted, status: ${response.code}`)
      return
    } else {
      await this.transferOut(new Uint8Array(0).buffer)
      console.log(
        `${PREFIX_LOG} Cancel transfer: unknown error: status code ${response.code}`
      )
    }
  }

  private async transferOut(
    buffer: ArrayBuffer,
    timeoutMs: number = 5000,
    error = new AppError(MTPError.MTP_WRITE_TIMEOUT)
  ): ReturnType<WebUSBDevice["transferOut"]> {
    return withTimeout(this.device.transferOut(0x01, buffer), timeoutMs, error)
  }

  private async transferIn(
    timeoutMs: number = 5000,
    error = new AppError(MTPError.MTP_READ_TIMEOUT)
  ): ReturnType<WebUSBDevice["transferIn"]> {
    return withTimeout(
      this.device.transferIn(0x01, this.packetSize),
      timeoutMs,
      error
    )
  }

  private async write(
    container: RequestContainerPacket
  ): ReturnType<WebUSBDevice["transferOut"]> {
    console.log(
      `${PREFIX_LOG} write... container: ${JSON.stringify(container)}`
    )
    const buffer = buildContainerPacket(container)
    console.log(`${PREFIX_LOG} write... `, buffer)
    const result = await this.transferOut(buffer)
    console.log(`${PREFIX_LOG} write... result: ${JSON.stringify(result)}`)
    return result as ReturnType<WebUSBDevice["transferOut"]>
  }

  private async readDataInChunks(): Promise<ResponseContainerPacket> {
    try {
      let result = await this.transferIn()

      if (
        result &&
        result.data &&
        result.data.byteLength &&
        result.data.byteLength > 0
      ) {
        let raw = new Uint8Array(result.data.buffer)
        const bytes = new DataView(result.data.buffer)
        const containerLength = bytes.getUint32(0, true)

        console.log(
          `${PREFIX_LOG} read... container length: ${containerLength}`
        )
        console.log(`${PREFIX_LOG} read... buffer length: ${raw.byteLength}`)

        while (raw.byteLength !== containerLength) {
          result = await this.transferIn()
          console.log(
            `${PREFIX_LOG} read... buffer length: ${result.data.byteLength}`
          )

          const uint8array = raw.slice()
          raw = new Uint8Array(uint8array.byteLength + result.data.byteLength)
          raw.set(uint8array)
          raw.set(new Uint8Array(result.data.buffer), uint8array.byteLength)
        }

        return parseContainerPacket(raw.buffer)
      }

      console.log(`${PREFIX_LOG} read... empty buffer`)

      return parseContainerPacket(new ArrayBuffer(0))
    } catch (error: unknown) {
      console.log(`${PREFIX_LOG} read... error: ${JSON.stringify(error)}`)
      throw error
    }
  }

  private async read(
    transactionId: number,
    type: ContainerTypeCode = ContainerTypeCode.Response,
    maxAttempts: number = 10
  ): Promise<ResponseContainerPacket> {
    let attempts = 0

    console.log(`${PREFIX_LOG} read transactionId: ${transactionId}...`)

    while (attempts < maxAttempts) {
      attempts++

      const response = await this.readDataInChunks()

      console.log(
        `${PREFIX_LOG} read ${attempts}/${maxAttempts}: transactionId ${transactionId}, response: ${JSON.stringify(
          response
        )}`
      )

      if (response.type === type && response.transactionId === transactionId) {
        return response
      }

      console.log(
        `${PREFIX_LOG} read retry: transactionId or type mismatch. Attempt ${attempts} failed, retrying...`
      )
    }

    throw new AppError(MTPError.MTP_READ_FAILURE)
  }

  private async openDevice(): Promise<void> {
    console.log(`${PREFIX_LOG} openDevice opened: ${this.device.opened}`)
    if (!this.device.opened) {
      await this.device.open()
    }
  }

  private async claimInterface(
    configurationIndex = 0,
    interfaceClass = 6
  ): Promise<void> {
    console.log(`${PREFIX_LOG} claimInterface...`)
    const mtpInterface = this.device.configurations[
      configurationIndex
    ].interfaces.find(
      // @ts-ignore
      ({ alternate }) => alternate.interfaceClass === interfaceClass
    )

    if (mtpInterface) {
      await this.device.claimInterface(mtpInterface.interfaceNumber)
    } else {
      throw new AppError(
        MTPError.MTP_INITIALIZE_ACCESS_ERROR,
        "MTP interface not found"
      )
    }

    console.log(`${PREFIX_LOG} claimInterface successfully`)
  }

  private async openSession(): Promise<void> {
    console.log(`${PREFIX_LOG} openSession...`)

    const transactionId = this.getTransactionId()

    await this.write({
      transactionId,
      type: ContainerTypeCode.Command,
      code: ContainerCode.OpenSession,
      payload: [
        {
          type: "UINT32",
          value: 1,
        },
      ],
    })

    const response = await this.read(transactionId)

    if (
      response.code === ContainerCode.SessionAlreadyOpen ||
      response.code === ContainerCode.StatusOk
    ) {
      console.log(`${PREFIX_LOG} openSession successfully`)
    } else {
      console.log(`${PREFIX_LOG} openSession failed`)
      throw new AppError(
        MTPError.MTP_INITIALIZE_ACCESS_ERROR,
        "Failed to open session"
      )
    }
  }

  private getTransactionId(): number {
    const id = this.transactionIdCounter++
    if (this.transactionIdCounter >= 0xffffffff) {
      this.transactionIdCounter = 1
    }
    return id
  }
}
