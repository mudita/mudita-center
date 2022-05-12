import { Device } from "usb"
import { DeviceIdentity } from "../types"

export interface DeviceAdapterClass {
  getDeviceByDescription(props: DeviceIdentity): Promise<Device>
}
