export enum DeviceResponseStatus {
  Ok = "ok",
  Error = "error",
}

export default interface DeviceResponse<T = {}> {
  status: DeviceResponseStatus
  data?: T
}
