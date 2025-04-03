/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { WebUSBDevice } from "usb"
import { AppError } from "../../../../core/core/errors/app-error"
import { MTPError } from "../app-mtp.interface"
import { buildContainerPacket } from "./utils/build-container-packet"
import {
  allStorage,
  ContainerCode,
  ContainerTypeCode,
  rootObjectHandle,
} from "./mtp-packet-definitions"
import {
  parseContainerPacket,
  ResponseContainerPacket,
} from "./utils/parse-container-packet"
import { getUint32s } from "./utils/get-uint-32s"
import { getObjectFormat } from "./utils/get-object-format"
import { getObjectInfoDataset } from "./utils/get-object-info-dataset"
import { withTimeout } from "./utils/with-timeout"

export interface UploadFileInfoOptions {
  size: number
  name: string
  storageId: number
  parentObjectHandle: number
}

const PREFIX_LOG = `[app-mtp/node-mtp-device]`

export class NodeMtpDevice {
  public id: string = ""
  private transactionId = 0
  private packetSize = 1024

  constructor(private device: WebUSBDevice) {
    this.id = String(this.device.serialNumber)
  }

  async initialize() {
    await this.openDevice()
    await this.claimInterface()
    await this.openSession()
  }

  async getObjectHandles(
    parentHandle = rootObjectHandle,
    storageID = allStorage,
    formatCode = 0
  ): Promise<number[]> {
    console.log(`${PREFIX_LOG} getObjectHandles...`)
    const transactionId = this.getTransactionId()
    await this.write(
      buildContainerPacket({
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
    )
    const response = await this.read()
    console.log(
      `${PREFIX_LOG} getObjectHandles response: ${JSON.stringify(response)}`
    )

    const [_length, ...objectHandles] = getUint32s(response.payload)

    console.log(
      `${PREFIX_LOG} getObjectHandles data: ${JSON.stringify(objectHandles)}`
    )

    return objectHandles
  }

  async uploadFileInfo({
    name,
    size,
    storageId,
    parentObjectHandle,
  }: UploadFileInfoOptions): Promise<number> {
    console.log(`${PREFIX_LOG} uploadFileInfo...`)

    const transactionId = this.getTransactionId()

    const sendObjectInfoCommandPacket = buildContainerPacket({
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

    const sendObjectInfoCommandResult = await this.write(
      sendObjectInfoCommandPacket
    )
    console.log(
      `${PREFIX_LOG} uploadFileInfo result: ${JSON.stringify(
        sendObjectInfoCommandResult
      )}`
    )

    try {
      const sendObjectInfoCommandResponse = await this.read()

      console.log(
        `${PREFIX_LOG} uploadFileInfo response: ${JSON.stringify(
          sendObjectInfoCommandResponse
        )}`
      )
    } catch (e) {
      console.log(e)
    }

    const objectFormat = getObjectFormat(name)

    const sendObjectInfoDataPacket = buildContainerPacket({
      transactionId,
      type: ContainerTypeCode.Data,
      code: ContainerCode.SendObjectInfo,
      payload: getObjectInfoDataset({
        objectFormat,
        objectCompressedSize: size,
        filename: name,
        storageID: storageId,
        parentObject: parentObjectHandle,
      }),
    })

    const sendObjectInfoDataResult = await this.write(sendObjectInfoDataPacket)
    console.log(
      `${PREFIX_LOG} uploadFileInfo result: ${JSON.stringify(
        sendObjectInfoDataResult
      )}`
    )
    const sendObjectInfoDataResponse = await this.read()
    console.log(
      `${PREFIX_LOG} uploadFileInfo response: ${JSON.stringify(
        sendObjectInfoDataResponse
      )}`
    )

    const parameters = getUint32s(sendObjectInfoDataResponse.payload)

    return parameters[2]
  }

  async initiateUploadFile(size: number): Promise<void> {
    console.log(`${PREFIX_LOG} initiateUploadFile...`)
    const transactionId = this.getTransactionId()
    const uploadFileCommandPacket = buildContainerPacket({
      transactionId,
      type: ContainerTypeCode.Command,
      code: ContainerCode.SendObject,
    })

    const uploadFileCommandResult = await this.write(uploadFileCommandPacket)
    console.log(
      `${PREFIX_LOG} initiateUploadFile uploadFileCommandResult: ${JSON.stringify(
        uploadFileCommandResult
      )}`
    )

    const uploadFileDataPacket = buildContainerPacket({
      transactionId,
      type: ContainerTypeCode.Data,
      code: ContainerCode.SendObject,
      fixSize: size + 12,
    })

    const uploadFileDataResult = await this.write(uploadFileDataPacket)
    console.log(
      `${PREFIX_LOG} initiateUploadFile uploadFileDataResult: ${JSON.stringify(
        uploadFileDataResult
      )}`
    )
  }

  async uploadFileData(chunk: Uint8Array): Promise<void> {
    console.log(`${PREFIX_LOG} uploadFileData...`)
    const result = await this.write(new Uint8Array(chunk))
    console.log(
      `${PREFIX_LOG} uploadFileData result: ${JSON.stringify(result)}`
    )
  }

  async getUploadFileResponse(): Promise<void> {
    console.log(`${PREFIX_LOG} getUploadFileResponse...`)
    try {
      const sendObjectDataBlockResponse = await this.read()
      console.log(
        `${PREFIX_LOG} getUploadFileResponse response: ${JSON.stringify(
          sendObjectDataBlockResponse
        )}`
      )
    } catch (e) {
      // The error is skipped because the response is not always received.
      console.log(`${PREFIX_LOG} getUploadFileResponse error: ${JSON.stringify(e)}`)
    }
  }

  private async transferOut(
    buffer: ArrayBuffer,
    timeoutMs: number = 5000,
    error = new AppError(MTPError.MTP_WRITE_TIMEOUT)
  ): ReturnType<WebUSBDevice["transferIn"]> {
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
    buffer: ArrayBuffer
  ): ReturnType<WebUSBDevice["transferOut"]> {
    console.log(`${PREFIX_LOG} write... buffer length: ${buffer.byteLength}`)
    return this.transferOut(buffer)
  }

  private async read(): Promise<ResponseContainerPacket> {
    try {
      console.log(`${PREFIX_LOG} read...`)
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
      throw new AppError(MTPError.MTP_GENERAL_ERROR, "MTP interface not found")
    }

    // The following line is commented out because the packet size limit definition is currently in progress.
    // this.packetSize = mtpInterface.alternate.endpoints[0].packetSize * 2

    console.log(`${PREFIX_LOG} claimInterface successfully`)
  }

  private async openSession(): Promise<void> {
    console.log(`${PREFIX_LOG} openSession...`)

    const transactionId = this.getTransactionId()

    const packet = buildContainerPacket({
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

    const result = await this.write(packet)
    console.log(`${PREFIX_LOG} openSession result: ${JSON.stringify(result)}`)

    const response = await this.read()

    console.log(
      `${PREFIX_LOG} openSession response: ${JSON.stringify(response)}`
    )

    console.log(`${PREFIX_LOG} openSession successfully`)
  }

  private getTransactionId(): number {
    return this.transactionId++
  }
}
