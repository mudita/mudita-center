import { ipcMain } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerDisconnectDeviceEmitter = (event: any) => {
  ipcMain.sendToRenderers<any>(IpcEmitter.disconnectDevice, event)
}

export default registerDisconnectDeviceEmitter
