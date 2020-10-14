import { ipcMain } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const onDisconnectDeviceEmitter = (payload: any) => {
  ipcMain.sendToRenderers<any>(IpcEmitter.onDisconnectDevice, payload)
}

export default onDisconnectDeviceEmitter
