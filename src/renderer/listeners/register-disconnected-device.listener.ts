import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerDisconnectedDeviceListener = (listener: () => void): void => {
  ipcRenderer.on(IpcEmitter.DisconnectedDevice, listener)
}

export const removeDisconnectedDeviceListener = (
  listener: () => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.DisconnectedDevice, listener)
}

export default registerDisconnectedDeviceListener
