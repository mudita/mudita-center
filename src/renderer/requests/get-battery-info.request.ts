import BatteryInfo from "Common/interfaces/battery-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const getBatteryInfo = (): Promise<BatteryInfo> =>
  ipcRenderer.callMain(IpcRequest.GetBatteryInfo)

export default getBatteryInfo
