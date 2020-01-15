import SimInfo from "Common/interfaces/sim-info.interface"

export default interface NetworkInfo {
  // List of SIM cards used on the device.
  readonly simCards: SimInfo[]
}
