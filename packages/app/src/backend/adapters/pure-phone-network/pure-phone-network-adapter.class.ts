import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import DeviceResponse from "Backend/adapters/device-response.interface"

export default abstract class PurePhoneNetworkAdapter {
  public abstract getSimCards(): Promise<DeviceResponse<SimCard[]>>
  public abstract setActiveCard(): DeviceResponse
}
