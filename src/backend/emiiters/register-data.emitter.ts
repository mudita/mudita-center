import { ipcMain } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerDataEmitter = (event: any) => {
  ipcMain.sendToRenderers<any>(IpcEmitter.data, event)
}

export default registerDataEmitter
