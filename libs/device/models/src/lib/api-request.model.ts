/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const APIEndpoints = [
  "API_CONFIGURATION",
  "FEATURE_CONFIGURATION",
  "FEATURE_DATA",
  "DATA_SYNC",
  "MENU_CONFIGURATION",
  "OUTBOX",
  "PRE_BACKUP",
  "POST_BACKUP",
  "PRE_FILE_TRANSFER",
  "FILE_TRANSFER",
  "PRE_RESTORE",
  "RESTORE",
  "SYSTEM",
  "PRE_DATA_TRANSFER",
  "DATA_TRANSFER",
] as const

export type APIEndpointType = (typeof APIEndpoints)[number]

export const APIMethods = ["GET", "POST", "PUT", "DELETE"] as const

export type APIMethodsType = (typeof APIMethods)[number]

const APIRequests = {
  MENU_CONFIGURATION: ["GET"],
  DATA_SYNC: ["POST"],
  FEATURE_DATA: ["GET"],
  FEATURE_CONFIGURATION: ["GET"],
  API_CONFIGURATION: ["GET"],
  OUTBOX: ["GET"],
  PRE_BACKUP: ["POST", "GET"],
  POST_BACKUP: ["POST"],
  PRE_FILE_TRANSFER: ["POST", "GET"],
  FILE_TRANSFER: ["POST", "GET"],
  PRE_RESTORE: ["POST"],
  RESTORE: ["POST", "GET", "DELETE"],
  SYSTEM: ["POST"],
  PRE_DATA_TRANSFER: ["POST"],
  DATA_TRANSFER: ["POST", "GET", "DELETE"],
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
