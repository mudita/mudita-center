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
  CancelEntitiesData,
  cancelEntitiesDataValidator,
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
import { ResponseStatus } from "../../../../../core/device/constants/response-status.constant"

export interface GetEntitiesDataRequestConfig {
  entitiesType: string
  entityId?: EntityId
  responseType: "json" | "file"
  deviceId?: DeviceId
  action?: "abort" | "create" | "get"
}

export class APIEntitiesService {
  constructor(
    private deviceProtocol: DeviceProtocol,
    private serviceBridge: ServiceBridge
  ) {}

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
  public async getEntitiesData(
    config: GetEntitiesDataRequestConfig
  ): Promise<
    ResultObject<
      | EntitiesJsonData
      | EntityJsonData
      | undefined
      | (EntitiesFileData & { status: ResponseStatus })
      | CancelEntitiesData
    >
  > {
    if (config.responseType === "json") {
      return this.getEntitiesDataViaJsonResponseType(config)
    } else if (config.responseType === "file") {
      return this.getEntitiesDataViaFileResponseType(config)
    } else {
      return Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }
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
  public async deleteEntitiesData({
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
    const chunkSize = 500
    const chunks: EntityId[][] = []
    for (let i = 0; i < ids.length; i += chunkSize) {
      chunks.push(ids.slice(i, i + chunkSize))
    }

    let overallStatus = ResponseStatus.Ok
    const failedIds: EntityId[] = []

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      const response = await device.request({
        endpoint: "ENTITIES_DATA",
        method: "DELETE",
        body: { entityType: entitiesType, ids: chunk },
      })

      const status = response.ok
        ? response.data.status
        : ResponseStatus.NotFound

      if (response.ok && status === ResponseStatus.MultiResponse) {
        const partialSuccessValidator =
          entitiesDeletePartialSuccessValidator.safeParse(response.data!.body)
        if (!partialSuccessValidator.success) {
          logger.error(partialSuccessValidator.error)
          return this.handleError(status)
        }
        failedIds.push(...partialSuccessValidator.data.failedIds)
        overallStatus = ResponseStatus.MultiResponse
      } else if (
        status === ResponseStatus.NotFound ||
        status == ResponseStatus.InternalServerError
      ) {
        failedIds.push(...chunk)

        if (overallStatus === ResponseStatus.Ok) {
          overallStatus =
            i === 0 ? ResponseStatus.NotFound : ResponseStatus.MultiResponse
        }
      }
    }
    if (overallStatus === ResponseStatus.Ok) {
      return Result.success(undefined)
    }

    if (
      overallStatus === ResponseStatus.NotFound &&
      failedIds.length === ids.length
    ) {
      return this.handleError(ResponseStatus.NotFound)
    }
    return Result.success({ failedIds })
  }

  @IpcEvent(APIEntitiesServiceEvents.EntityDataCreate)
  public async createEntityData(
    {
      entitiesType,
      data,
      deviceId,
    }: {
      entitiesType: string
      data: EntityData
      deviceId?: DeviceId
    },
    p0: unknown
  ): Promise<ResultObject<EntityDataPost>> {
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

  private async getEntitiesDataViaFileResponseType(
    config: GetEntitiesDataRequestConfig
  ): Promise<
    ResultObject<
      | undefined
      | (EntitiesFileData & { status: ResponseStatus })
      | CancelEntitiesData
    >
  > {
    if (config.action === "abort") {
      return this.cancelGetEntitiesData(config)
    } else if (config.action === "create") {
      return this.createEntitiesData(config)
    } else if (config.action === "get") {
      return this.getEntitiesDataAction(config)
    } else {
      return this.handleError(GeneralError.InternalError)
    }
  }

  private async getEntitiesDataViaJsonResponseType({
    entitiesType,
    entityId,
    deviceId,
    responseType,
  }: GetEntitiesDataRequestConfig): Promise<
    ResultObject<EntitiesJsonData | EntityJsonData>
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
      EntitiesJsonData | EntityJsonData
    >

    if (entityId === undefined) {
      data = entitiesJsonDataValidator.safeParse(response.data.body)
    } else {
      data = entityJsonDataValidator.safeParse(response.data.body)
    }

    if (!data!.success) {
      return this.handleError(response.data.status)
    }
    return this.handleSuccess(data!)
  }

  private async cancelGetEntitiesData({
    entitiesType,
    entityId,
    deviceId,
    responseType,
    action,
  }: GetEntitiesDataRequestConfig): Promise<ResultObject<CancelEntitiesData>> {
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
        action,
      },
    })

    if (!response.ok) {
      return this.handleError(response.error.type)
    }

    const data = cancelEntitiesDataValidator.safeParse(response.data.body)

    if (!data!.success) {
      return this.handleError(response.data.status)
    }

    return this.handleSuccess(data)
  }

  private async createEntitiesData({
    entitiesType,
    entityId,
    responseType,
    deviceId,
  }: GetEntitiesDataRequestConfig): Promise<ResultObject<EntitiesFileData>> {
    const device = this.getDevice(deviceId)
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "ENTITIES_DATA",
      method: "GET",
      body: {
        action: "create",
        entityType: entitiesType,
        responseType,
        ...(entityId && { entityId }),
      },
    })

    if (!response.ok) {
      return this.handleError(response.error.type)
    }

    const data = entitiesFileDataValidator.safeParse(response.data.body)

    if (data.success) {
      return Result.success(data.data)
    } else {
      return this.handleError(response.data.status)
    }
  }

  private async getEntitiesDataAction({
    entitiesType,
    entityId,
    responseType,
    deviceId,
  }: GetEntitiesDataRequestConfig): Promise<
    ResultObject<
      EntitiesFileData & {
        status: ResponseStatus
      }
    >
  > {
    const device = this.getDevice(deviceId)
    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "ENTITIES_DATA",
      method: "GET",
      body: {
        action: "get",
        entityType: entitiesType,
        responseType,
        ...(entityId && { entityId }),
      },
    })

    if (!response.ok) {
      return this.handleError(response.error.type)
    }

    const data = entitiesFileDataValidator.safeParse(
      response.data.body
    ) as SafeParseSuccess<EntitiesFileData & { status: ResponseStatus }>
    data.data.status = response.data.status
    return this.handleSuccess(data)
  }
}
