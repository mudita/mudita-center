export enum DeviceResponseStatus {
  Ok = "ok",
  Error = "error",
}

export interface ErrorResponse {
  message: string
}

export default interface DeviceResponse<T = Record<string, string>> {
  status: DeviceResponseStatus
  data?: T
  error?: ErrorResponse
}
