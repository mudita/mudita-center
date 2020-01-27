import SimInfo from "Common/interfaces/sim-info.interface"

export default abstract class PurePhoneNetworkAdapter {
  public abstract getSimCards(): SimInfo[]
  public abstract changeSimCard(): number
}
