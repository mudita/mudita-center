import {
  ElectronAPI,
  IpcRenderer as IpcRendererOriginal,
} from "@electron-toolkit/preload"
import { IpcAppSerialport } from "app-serialport/main"

declare global {
  type CustomIpcRenderer = IpcAppSerialport & IpcRendererOriginal
  interface Electron extends ElectronAPI {
    ipcRenderer: CustomIpcRenderer
  }
  interface Window {
    electron: Electron
  }
}
