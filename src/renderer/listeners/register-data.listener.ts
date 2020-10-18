import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerDataListener = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.on(IpcEmitter.data, listener)
}

export const removeDataListener = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.data, listener)
}

export default registerDataListener
