export enum DeviceResponseStatus {
  Ok = "ok",
  Error = "error",
}

interface DeviceResponseError<DataType> {
  code?: number
  message: string
  data?: DataType
}

export default interface DeviceResponse<DataType = Record<string, string>> {
  status: DeviceResponseStatus
  data?: DataType
  error?: DeviceResponseError<DataType>
}
