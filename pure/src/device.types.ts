export enum ResponseStatus {
  Ok = 200,
  Accepted = 202,
  BadRequest = 400,
  NotAcceptable = 406,
  InternalServerError = 500,

  // lib status
  ConnectionError = 503,
}

export interface Response<Body = undefined> {
  status: ResponseStatus
  body?: Body
  endpoint?: Endpoint
  uuid?: string
}

export enum DeviceEventName {
  Disconnected = "disconnected",
  DataReceived = "dataReceived",
}

export enum Endpoint {
  Invalid = 0,
  DeviceInfo = 1,
  Update = 2,
  FilesystemUpload = 3,
  Backup = 4,
  Restore = 5,
  Factory = 6,
  Contacts = 7,
  Messages = 8,
  Callog = 9,

  // lib endpoint
  File = 100,
  PureUpdate = 101,
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

export interface RequestConfig {
  endpoint: Endpoint
  method: Method
  body?: any
  file?: string
}

export enum FileResponseStatus {
  Ok = "0",
}

export enum UpdateResponseStatus {
  Ok = "Ready for reset",
}
