/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "./constants"

export interface MuditaDevice {
  path: string
  deviceType: DeviceType
  connect(): Promise<Response>
  disconnect(): Promise<Response>
  request(config: RequestConfig<any>): Promise<Response<any>>
  on(eventName: DeviceEventName, listener: () => void): void
  off(eventName: DeviceEventName, listener: () => void): void
}

export type CreateDeviceStrategy = (
  path: string,
  deviceType: DeviceType
) => MuditaDevice

export enum ResponseStatus {
  Ok = 200,
  Accepted = 202,
  Redirect = 303,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  PhoneLocked = 403,
  NotAcceptable = 406,
  Conflict = 409,
  InternalServerError = 500,
  UnprocessableEntity = 422,

  // lib status
  ConnectionError = 503,
  ParserError = 504,
  Timeout = 505,
}

export type ResponseErrorCode = number

interface ResponseError {
  code?: ResponseErrorCode
  message: string
}

export interface Response<Body = undefined> {
  status: ResponseStatus
  body?: Body
  endpoint?: Endpoint
  uuid?: number
  error?: ResponseError
}

export enum DeviceEventName {
  Disconnected = "disconnected",
  DataReceived = "dataReceived",
}

export enum Endpoint {
  Invalid = 0,
  DeviceInfo = 1,
  Update = 2,
  FileSystem = 3,
  Backup = 4,
  Restore = 5,
  Factory = 6,
  Contacts = 7,
  Messages = 8,
  CallLog = 9,
  Security = 13,
  Outbox = 13,

  // api version (mocked)
  ApiVersion = 1000,
}

export enum Method {
  Get = 1,
  Post = 2,
  Put = 3,
  Delete = 4,
}

export interface ApiRequestPayload extends RequestPayload {
  endpoint: Endpoint.ApiVersion
  method: Method.Get
}

export interface RequestPayload<T = undefined> extends RequestConfig<T> {
  uuid: number
}

export interface RequestConfig<Body = undefined> {
  endpoint: Endpoint
  method: Method
  body?: Body
  filePath?: string
}

export interface PaginationBody {
  limit: number
  offset: number
}
