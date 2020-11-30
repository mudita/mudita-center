import SimInfo from "Common/interfaces/sim-info.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

export default abstract class PurePhoneNetworkAdapter {
  public abstract getSimCards(): Promise<DeviceResponse<SimInfo[]>>
  public abstract setActiveCard(): DeviceResponse
}
