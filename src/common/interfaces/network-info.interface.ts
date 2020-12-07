import { SimCard } from "Renderer/models/basic-info/basic-info.typings"

export default interface NetworkInfo {
  // List of SIM cards used on the device.
  readonly simCards: SimCard[]
}
