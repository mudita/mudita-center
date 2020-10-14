import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const onDisconnectDevice = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.on(IpcEmitter.onDisconnectDevice, listener)
}

export const removeDisconnectDeviceLister = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.onDisconnectDevice, listener)
}

export default onDisconnectDevice
