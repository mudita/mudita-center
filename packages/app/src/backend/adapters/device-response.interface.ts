import { ResponseErrorCode as PureResponseErrorCode } from "@mudita/mudita-center-pure"
import { DeviceUpdateResponseErrorCode } from "Backend/adapters/pure-phone/pure-phone.adapter"

export type ResponseErrorCode = PureResponseErrorCode | DeviceUpdateResponseErrorCode

export enum DeviceResponseStatus {
  Ok = "ok",
  Error = "error",
}

interface DeviceResponseError<DataType> {
  code?: ResponseErrorCode
  message: string
  data?: DataType
}

export default interface DeviceResponse<DataType = Record<string, string>> {
  status: DeviceResponseStatus
  data?: DataType
  error?: DeviceResponseError<DataType>
}
