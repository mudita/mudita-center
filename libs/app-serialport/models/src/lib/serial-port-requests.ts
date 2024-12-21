/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const APIEndpoints = [
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
  "ENTITIES_CONFIGURATION",
  "ENTITIES_DATA",
  "ENTITIES_METADATA",
] as const

type APIEndpointType = (typeof APIEndpoints)[number]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const APIMethods = ["GET", "POST", "PUT", "DELETE"] as const

type APIMethodsType = (typeof APIMethods)[number]

export interface APIRequestData {
  endpoint: APIEndpointType
  method: APIMethodsType
  body?: Record<string, unknown>
  rid?: number
  options?: { connectionTimeOut?: number }
}

export interface APIResponseData {
  rid: number
  endpoint: APIEndpointType
  status: number
  body: Record<string, unknown>
}
