import { ipcMain } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerConnectDeviceEmitter = (event: any) => {
  ipcMain.sendToRenderers<any>(IpcEmitter.connectDevice, event)
}

export default registerConnectDeviceEmitter
