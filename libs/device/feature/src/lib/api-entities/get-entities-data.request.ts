/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { ResultObject } from "Core/core/builder"
import { DeviceId } from "Core/device/constants/device-id"
import {
  APIEntitiesServiceEvents,
  EntitiesFileData,
  EntitiesJsonData,
  EntityJsonData,
} from "device/models"

export type EntityId = string | number
export type EntityDataResponseType = "json" | "file"

type ReturnType<
  R extends string = EntityDataResponseType,
  E extends EntityId | undefined = undefined
> = R extends "json"
  ? E extends undefined
    ? EntitiesJsonData
    : EntityJsonData
  : EntitiesFileData

export const getEntitiesDataRequest = <
  R extends string = EntityDataResponseType,
  E extends EntityId | undefined = undefined
>(data: {
  entityType: string
  entityId?: E
  responseType: R
  deviceId: DeviceId
}): Promise<ResultObject<ReturnType<R, E>>> => {
  return ipcRenderer.callMain(APIEntitiesServiceEvents.EntitiesDataGet, data)
}

export const readEntitiesDataFromFileRequest = (data: {
  transferId: number
}): Promise<ResultObject<EntitiesJsonData>> => {
  return ipcRenderer.callMain(
    APIEntitiesServiceEvents.EntitiesDataReadFromFile,
    data
  )
}

export const readEntityDataFromFileRequest = (data: {
  transferId: number
}): Promise<ResultObject<EntityJsonData>> => {
  return ipcRenderer.callMain(
    APIEntitiesServiceEvents.EntityDataReadFromFile,
    data
  )
}