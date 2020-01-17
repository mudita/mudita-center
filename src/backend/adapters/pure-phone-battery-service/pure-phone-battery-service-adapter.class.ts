export default abstract class PurePhoneBatteryServiceAdapter {
  public abstract getBatteryLevel(): number
  public abstract getChargingStatus(): boolean
  public abstract getMaximumCapacity(): number
}
