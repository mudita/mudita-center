/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface PureDevice {
  connect(): Promise<Response>
  disconnect(): Promise<Response>
  request(config: RequestConfig<any>): Promise<Response<any>>
  on(eventName: DeviceEventName, listener: () => void): void
  off(eventName: DeviceEventName, listener: () => void): void
}

export type CreateDevice = (path: string) => PureDevice

export enum ResponseStatus {
  Ok = 200,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  PhoneLocked = 403,
  NotAcceptable = 406,
  InternalServerError = 500,

  // lib status
  ConnectionError = 503,
  ParserError = 504,
}

export type ResponseErrorCode = number

interface ResponseError {
  code: ResponseErrorCode
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

  // lib endpoint
  UploadUpdateFileSystem = 100,
  DeviceUpdate = 101,

  // api version (mocked)
  ApiVersion = 1000,
}

export enum Method {
  Get = 1,
  Post = 2,
  Put = 3,
  Delete = 4,
}

export enum BodyCommand {
  Download = "download",
}

export interface ApiRequestPayload extends RequestPayload {
  endpoint: Endpoint.ApiVersion
  method: Method.Get
}

export interface DeviceUpdateRequestPayload extends RequestPayload {
  endpoint: Endpoint.DeviceUpdate
  method: Method.Post
  filePath: string
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

export enum FileResponseStatus {
  Ok = "1",
}

export enum UpdateResponseStatus {
  Ok = "Ready for reset",
}
