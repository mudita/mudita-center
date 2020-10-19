import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerDisconnectedDeviceListener = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.on(IpcEmitter.disconnectedDevice, listener)
}

export const removeDisconnectedDeviceListener = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.disconnectedDevice, listener)
}

export default registerDisconnectedDeviceListener
