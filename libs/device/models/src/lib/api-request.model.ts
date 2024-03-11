/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const APIEndpoints = {
  APIConfig: "API_CONFIGURATION",
  FeatureConfiguration: "FEATURE_CONFIGURATION",
  FeatureData: "FEATURE_DATA",
  DataSynchronization: "DATA_SYNC",
  MenuConfiguration: "MENU_CONFIGURATION",
  Outbox: "OUTBOX",
  PreBackup: "PRE_BACKUP",
  PostBackup: "POST_BACKUP",
  PreFileTransfer: "PRE_FILE_TRANSFER",
  FileTransfer: "FILE_TRANSFER",
  PreRestore: "PRE_RESTORE",
  Restore: "RESTORE",
  System: "SYSTEM",
} as const

export type APIEndpointType = (typeof APIEndpoints)[keyof typeof APIEndpoints]

const APIMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const

export type APIMethodsType = (typeof APIMethods)[keyof typeof APIMethods]

const APIRequests = {
  MENU_CONFIGURATION: [APIMethods.GET],
  DATA_SYNC: [APIMethods.POST],
  FEATURE_DATA: [APIMethods.GET],
  FEATURE_CONFIGURATION: [APIMethods.GET],
  API_CONFIGURATION: [APIMethods.GET],
  OUTBOX: [APIMethods.GET],
  PRE_BACKUP: [APIMethods.POST, APIMethods.GET],
  POST_BACKUP: [APIMethods.POST],
  PRE_FILE_TRANSFER: [APIMethods.POST, APIMethods.GET],
  FILE_TRANSFER: [APIMethods.POST, APIMethods.GET],
  PRE_RESTORE: [APIMethods.POST],
  RESTORE: [APIMethods.POST, APIMethods.GET],
  SYSTEM: [APIMethods.POST],
} as const

interface APIRequestConfig<
  E extends APIEndpointType,
  M = (typeof APIRequests)[E]
> {
  endpoint: E
  method: M[keyof M]
}

export interface APIRequestWithPayload<
  T extends APIEndpointType,
  Body = Record<string, unknown>
> extends APIRequestConfig<T> {
  body?: Body
}

export interface APIRequestData {
  endpoint: APIEndpointType
  method: APIMethodsType
  body?: Record<string, unknown>
  rid?: number
  options?: { connectionTimeOut?: number }
}
