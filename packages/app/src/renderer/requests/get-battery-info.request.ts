import BatteryInfo from "Common/interfaces/battery-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const getBatteryInfo = (): Promise<DeviceResponse<BatteryInfo>> =>
  ipcRenderer.callMain(IpcRequest.GetBatteryInfo)

export default getBatteryInfo
