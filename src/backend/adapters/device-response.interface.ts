export enum DeviceResponseStatus {
  Ok = "ok",
  Error = "error",
}

export default interface DeviceResponse<T = Record<string, string>> {
  status: DeviceResponseStatus
  data?: T
}
