import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerConnectedDeviceListener = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.on(IpcEmitter.connectedDevice, listener)
}

export const removeConnectedDeviceListener = (
  listener: (event: any, props: any) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.connectedDevice, listener)
}

export default registerConnectedDeviceListener
