/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { Result, ResultObject } from "Core/core/builder"
import { AppError, AppErrorType } from "Core/core/errors"
import {
  APIEntitiesServiceEvents,
  EntitiesConfig,
  entitiesConfigValidator,
  entitiesDeletePartialSuccessValidator,
  EntitiesDeleteResponse,
  EntitiesError,
  EntitiesFileData,
  entitiesFileDataValidator,
  EntitiesJsonData,
  entitiesJsonDataValidator,
  EntitiesMetadata,
  entitiesMetadataValidator,
  EntityData,
  EntityDataPatch,
  entityDataPatchValidator,
  EntityDataPost,
  entityDataPostValidator,
  EntityId,
  EntityJsonData,
  entityJsonDataValidator,
  GeneralError,
} from "device/models"
import { SafeParseReturnType, SafeParseSuccess } from "zod"
import { IpcEvent } from "Core/core/decorators"
import { ServiceBridge } from "../service-bridge"
import logger from "Core/__deprecated__/main/utils/logger"

export class APIEntitiesService {
  constructor(
    private deviceProtocol: DeviceProtocol,
    private serviceBridge: ServiceBridge
  ) {}

  private getDevice = (deviceId?: DeviceId) => {
    return deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice
  }

  private handleError(responseStatus: AppErrorType) {
    if (EntitiesError[responseStatus as EntitiesError]) {
      return Result.failed<unknown, AppErrorType>(
        new AppError(
          responseStatus,
          EntitiesError[responseStatus as EntitiesError]
        )
      )
    } else {
      return Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }
  }

  private handleSuccess<Data>(response: SafeParseSuccess<Data>) {
    return Result.success(response.data)
  }

  @IpcEvent(APIEntitiesServiceEvents.EntitiesConfig)
  public async getEntitiesConfiguration({
    entitiesType,
    deviceId,
  }: {
    entitiesType: string
    deviceId?: DeviceId
  }): Promise<ResultObject<EntitiesConfig>> {
    const device = this.getDevice(deviceId)
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "ENTITIES_CONFIGURATION",
      method: "GET",
      body: {
        entityType: entitiesType,
      },
    })
    if (!response.ok) {
      return this.handleError(response.error.type)
    }

    const apiConfig = entitiesConfigValidator.safeParse(response.data.body)
    if (!apiConfig.success) {
      return this.handleError(response.data.status)
    }
    return this.handleSuccess(apiConfig)
  }

  @IpcEvent(APIEntitiesServiceEvents.EntitiesMetadata)
  public async getEntitiesMetadata({
    entitiesType,
    deviceId,
  }: {
    entitiesType: string
    deviceId?: DeviceId
  }): Promise<ResultObject<EntitiesMetadata>> {
    const device = this.getDevice(deviceId)
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "ENTITIES_METADATA",
      method: "GET",
      body: {
        entityType: entitiesType,
      },
    })
    if (!response.ok) {
      return this.handleError(response.error.type)
    }

    const metadata = entitiesMetadataValidator.safeParse(response.data.body)
    if (!metadata.success) {
      return this.handleError(response.data.status)
    }
    return this.handleSuccess(metadata)
  }

  @IpcEvent(APIEntitiesServiceEvents.EntitiesDataGet)
  public async getEntitiesData({
    entitiesType,
    entityId,
    responseType,
    deviceId,
  }: {
    entitiesType: string
    responseType: "json" | "file"
    entityId?: EntityId
    deviceId?: DeviceId
  }): Promise<
    ResultObject<EntitiesJsonData | EntityJsonData | EntitiesFileData>
  > {
    const device = this.getDevice(deviceId)
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "ENTITIES_DATA",
      method: "GET",
      body: {
        entityType: entitiesType,
        responseType,
        ...(entityId && { entityId }),
      },
    })
    if (!response.ok) {
      return this.handleError(response.error.type)
    }

    let data: SafeParseReturnType<
      typeof response.data.body,
      EntitiesJsonData | EntityJsonData | EntitiesFileData
    >

    if (responseType === "file") {
      if (response.data.status === 202) {
        return this.getEntitiesData({
          entitiesType,
          entityId,
          responseType,
          deviceId,
        })
      } else if (response.data.status === 200) {
        data = entitiesFileDataValidator.safeParse(response.data.body)
      }
    }
    if (responseType === "json") {
      if (entityId === undefined) {
        data = entitiesJsonDataValidator.safeParse(response.data.body)
      } else {
        data = entityJsonDataValidator.safeParse(response.data.body)
      }
    }

    if (!data!.success) {
      return this.handleError(response.data.status)
    }
    return this.handleSuccess(data!)
  }

  @IpcEvent(APIEntitiesServiceEvents.EntitiesDataReadFromFile)
  public async readEntitiesDataFromFile({
    transferId,
  }: {
    transferId: number
  }): Promise<ResultObject<EntitiesJsonData>> {
    try {
      const file =
        this.serviceBridge.fileTransfer.getFileByTransferId(transferId)
      const decodedFile = Buffer.from(file.chunks.join(""), "base64").toString()
      const data = entitiesJsonDataValidator.safeParse(JSON.parse(decodedFile))
      this.serviceBridge.fileTransfer.transferClear({ transferId })
      if (!data.success) {
        return this.handleError(EntitiesError.EntitiesDataFileCorrupted)
      }
      return this.handleSuccess(data)
    } catch (error) {
      logger.error(error)
      return this.handleError(EntitiesError.EntitiesDataFileCorrupted)
    }
  }

  @IpcEvent(APIEntitiesServiceEvents.EntityDataReadFromFile)
  public async readEntityDataFromFile({
    transferId,
  }: {
    transferId: number
  }): Promise<ResultObject<EntityJsonData>> {
    try {
      const file =
        this.serviceBridge.fileTransfer.getFileByTransferId(transferId)
      const decodedFile = Buffer.from(file.chunks.join(""), "base64").toString()
      const data = entityJsonDataValidator.safeParse(JSON.parse(decodedFile))
      this.serviceBridge.fileTransfer.transferClear({ transferId })
      if (!data.success) {
        return this.handleError(EntitiesError.EntitiesDataFileCorrupted)
      }
      return this.handleSuccess(data)
    } catch (error) {
      logger.error(error)
      return this.handleError(EntitiesError.EntitiesDataFileCorrupted)
    }
  }

  @IpcEvent(APIEntitiesServiceEvents.EntitiesDataDelete)
  public async deleteEntityData({
    entitiesType,
    ids,
    deviceId,
  }: {
    entitiesType: string
    ids: EntityId[]
    deviceId?: DeviceId
  }): Promise<ResultObject<EntitiesDeleteResponse>> {
    const device = this.getDevice(deviceId)
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "ENTITIES_DATA",
      method: "DELETE",
      body: {
        entityType: entitiesType,
        ids,
      },
    })

    if (!response.ok) {
      return this.handleError(response.error.type)
    }

    if (response.data.status === 207) {
      const failedIdsValidator =
        entitiesDeletePartialSuccessValidator.safeParse(response.data.body)
      if (!failedIdsValidator.success) {
        logger.error(failedIdsValidator.error)
        return this.handleError(response.data.status)
      }
      return Result.success({ failedIds: failedIdsValidator.data.failedIds })
    }

    return Result.success(undefined)
  }

  @IpcEvent(APIEntitiesServiceEvents.EntityDataCreate)
  public async createEntityData({
    entitiesType,
    data,
    deviceId,
  }: {
    entitiesType: string
    data: EntityData
    deviceId?: DeviceId
  }): Promise<ResultObject<EntityDataPost>> {
    const device = this.getDevice(deviceId)
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "ENTITIES_DATA",
      method: "POST",
      body: {
        entityType: entitiesType,
        data,
      },
    })
    if (!response.ok) {
      return this.handleError(response.error.type)
    }
    const dataValidator = entityDataPostValidator.safeParse(response.data.body)
    if (!dataValidator.success) {
      logger.error(dataValidator.error)
      return this.handleError(response.data.status)
    }
    return Result.success(dataValidator.data)
  }

  @IpcEvent(APIEntitiesServiceEvents.EntityDataUpdate)
  public async updateEntityData({
    entitiesType,
    entityId,
    data,
    deviceId,
  }: {
    entitiesType: string
    entityId: EntityId
    data: EntityData
    deviceId?: DeviceId
  }): Promise<ResultObject<EntityDataPatch>> {
    const device = this.getDevice(deviceId)
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "ENTITIES_DATA",
      method: "PATCH",
      body: {
        entityType: entitiesType,
        entityId,
        data,
      },
    })
    if (!response.ok) {
      return this.handleError(response.error.type)
    }
    const dataValidator = entityDataPatchValidator.safeParse(response.data.body)
    if (!dataValidator.success) {
      logger.error(dataValidator.error)
      return this.handleError(response.data.status)
    }
    return Result.success(dataValidator.data)
  }
}