import DeviceResponse from "Backend/adapters/device-response.interface"

export default abstract class PurePhoneBatteryServiceAdapter {
  public abstract getBatteryLevel(): Promise<DeviceResponse<number>>
  public abstract getChargingStatus(): boolean
}
