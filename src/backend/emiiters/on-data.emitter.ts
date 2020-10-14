import { ipcMain } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const onDataEmitter = (payload: any) => {
  ipcMain.sendToRenderers<any>(IpcEmitter.onData, payload)
}

export default onDataEmitter
