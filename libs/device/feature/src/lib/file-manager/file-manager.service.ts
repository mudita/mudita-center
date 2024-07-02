/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { ServiceBridge } from "../service-bridge"
import { FileManagerServiceEvents, GeneralError } from "device/models"
import { AppError } from "Core/core/errors"
import { DeviceProtocol } from "device-protocol/feature"
import { DeviceId } from "Core/device/constants/device-id"
import packageInfo from "../../../../../../apps/mudita-center/package.json"
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  writeJSONSync,
} from "fs-extra"
import AES from "crypto-js/aes"
import SHA3 from "crypto-js/sha3"
import encBase64 from "crypto-js/enc-base64"
import { v4 as uuid } from "uuid"
import path from "path"

export class FileManager {
  private files: Record<string, unknown> = {}

  constructor(
    private deviceProtocol: DeviceProtocol,
    private serviceBridge: ServiceBridge
  ) {}

  @IpcEvent(FileManagerServiceEvents.SaveFile)
  public saveFileByTransferId({
    filePath,
    transferId,
  }: {
    filePath: string
    transferId: number
  }): ResultObject<undefined> {
    try {
      const file =
        this.serviceBridge.fileTransfer.getFileByTransferId(transferId)
      writeFileSync(filePath, file.chunks.join(), "base64")

      return Result.success(undefined)
    } catch (e) {
      console.log(e)
      return Result.failed(new AppError(GeneralError.IncorrectResponse))
    }
  }

  @IpcEvent(FileManagerServiceEvents.GetBackupPath)
  public getBackupPath({ deviceId }: { deviceId?: DeviceId } = {}) {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const vendorId = device.portInfo.vendorId ?? "unknown"
    const productId = device.portInfo.productId ?? "unknown"

    const { osBackupLocation } =
      this.serviceBridge.settingsService.getSettings()
    const backupLocation = path.join(
      osBackupLocation,
      `${vendorId}-${productId}`
    )
    return Result.success(backupLocation)
  }

  @IpcEvent(FileManagerServiceEvents.OpenBackupDirectory)
  public openBackupDirectory({ deviceId }: { deviceId?: DeviceId }) {
    const backupDirectory = this.getBackupPath({ deviceId })
    if (!backupDirectory.ok) {
      return Result.failed(new AppError(GeneralError.InternalError, ""))
    }
    return this.serviceBridge.systemUtilsModule.directory.open({
      path: backupDirectory.data,
    })
  }

  @IpcEvent(FileManagerServiceEvents.SecureBackupPassword)
  public secureBackupPassword({ password }: { password: string }) {
    return Result.success(SHA3(password).toString(encBase64))
  }

  @IpcEvent(FileManagerServiceEvents.SaveBackupFile)
  public saveBackupFile({
    deviceId,
    featureToTransferId,
    password,
  }: {
    deviceId?: DeviceId
    featureToTransferId: Record<string, number>
    password?: string
  }) {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }
    try {
      const vendorId = device.portInfo.vendorId ?? ""
      const productId = device.portInfo.productId ?? ""
      const serialNumber = device.portInfo.serialNumber ?? ""
      const timestamp = new Date().getTime()
      const appVersion = packageInfo.version
      const backupDirectory = this.getBackupPath({ deviceId })

      if (!backupDirectory.ok) {
        return Result.failed(new AppError(GeneralError.InternalError, ""))
      }

      const backupFilePath = path.join(
        backupDirectory.data,
        `${timestamp}_${serialNumber}.mcbackup`
      )

      const data = Object.entries(featureToTransferId).reduce(
        (acc, [feature, transferId]) => {
          const transfer =
            this.serviceBridge.fileTransfer.getFileByTransferId(transferId)

          const featureData = password
            ? AES.encrypt(transfer.chunks.join(), password).toString()
            : transfer.chunks.join()

          return { ...acc, [feature]: featureData }
        },
        {}
      )

      const fileToSave = {
        header: {
          vendorId,
          productId,
          serialNumber,
          appVersion,
          ...(password && {
            password: this.secureBackupPassword({ password }).data,
            crypto: "AES",
          }),
        },
        data,
      }

      mkdirSync(backupDirectory.data, { recursive: true })

      writeJSONSync(backupFilePath, fileToSave)

      return Result.success(undefined)
    } catch (e) {
      console.log(e)
      return Result.failed(new AppError(GeneralError.InternalError))
    }
  }

  @IpcEvent(FileManagerServiceEvents.ReadDirectory)
  public readDirectory({ path }: { path: string }): ResultObject<string[]> {
    try {
      const result = readdirSync(path)

      return Result.success(result)
    } catch (e) {
      console.log(e)
      return Result.failed(new AppError(GeneralError.InternalError))
    }
  }

  @IpcEvent(FileManagerServiceEvents.ReadBackupDirectory)
  public readBackupDirectory({
    deviceId,
  }: {
    deviceId?: DeviceId
  }): ResultObject<string[]> {
    const pathResult = this.getBackupPath({ deviceId })

    if (!pathResult.ok) {
      return Result.failed(new AppError(GeneralError.InternalError))
    }

    return this.readDirectory({ path: pathResult.data })
  }

  public getFile(id: string) {
    return this.files[id]
  }

  @IpcEvent(FileManagerServiceEvents.ReadFile)
  public readFile({ filePath }: { filePath: string | string[] }) {
    try {
      const id = uuid()
      this.files[id] = readFileSync(
        typeof filePath === "string" ? filePath : path.join(...filePath)
      )
      return Result.success(id)
    } catch (error) {
      console.error(error)
      return Result.failed(new AppError(GeneralError.InternalError))
    }
  }

  @IpcEvent(FileManagerServiceEvents.ReadAndGetFile)
  public readAndGetFile({ filePath }: Parameters<typeof this.readFile>[0]) {
    const fileId = this.readFile({ filePath })
    if (!fileId.ok) {
      return Result.failed(new AppError(GeneralError.InternalError))
    }
    const file = this.getFile(fileId.data)
    this.clearFile(fileId.data)
    if (!file) {
      return Result.failed(new AppError(GeneralError.InternalError))
    }
    return Result.success(file)
  }

  @IpcEvent(FileManagerServiceEvents.ClearFile)
  public clearFile(id: string) {
    delete this.files[id]
  }
}
