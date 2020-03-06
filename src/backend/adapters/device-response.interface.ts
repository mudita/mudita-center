export enum DeviceResponseStatus {
  Ok = "ok",
  Error = "error",
}

export default interface DeviceResponse {
  status: DeviceResponseStatus
}
