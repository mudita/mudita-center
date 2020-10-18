import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerDisconnectDeviceListener = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.on(IpcEmitter.disconnectDevice, listener)
}

export const removeDisconnectDeviceListener = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.disconnectDevice, listener)
}

export default registerDisconnectDeviceListener
