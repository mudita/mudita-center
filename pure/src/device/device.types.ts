export interface PureDevice {
  connect(): Promise<Response>
  disconnect(): Promise<Response>
  request(config: RequestConfig): Promise<Response<any>>
  on(eventName: DeviceEventName, listener: () => void): void
  off(eventName: DeviceEventName, listener: () => void): void
}

export type CreateDevice = (path: string) => PureDevice

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
  FileSystemUpload = 3,
  Backup = 4,
  Restore = 5,
  Factory = 6,
  Contacts = 7,
  Messages = 8,
  Callog = 9,

  // lib endpoint
  FileUpload = 100,
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

export interface RequestConfig {
  endpoint: Endpoint
  method: Method
  body?: any
  filePath?: string
}

export enum FileResponseStatus {
  Ok = "1",
}

export enum UpdateResponseStatus {
  Ok = "Ready for reset",
}
