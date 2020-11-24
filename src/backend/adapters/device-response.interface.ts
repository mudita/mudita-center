export enum DeviceResponseStatus {
  Ok = "ok",
  Error = "error",
}

interface DeviceResponseError {
  message: string
}

export default interface DeviceResponse<DataType = Record<string, string>> {
  status: DeviceResponseStatus
  data?: DataType
  error?: DeviceResponseError
}
