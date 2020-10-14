import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const onData = (listener: (event: any, props: any) => void): void => {
  ipcRenderer.on(IpcEmitter.onData, listener)
}

export const removeDataLister = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.onData, listener)
}

export default onData
