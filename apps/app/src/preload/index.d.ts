import {
  ElectronAPI,
  IpcRenderer as IpcRendererOriginal,
} from "@electron-toolkit/preload"
import { IpcAppSerialport } from "app-serialport/main"
import { IpcAppSql } from "app-sql/main"

declare global {
  type CustomIpcRenderer = IpcAppSerialport & IpcAppSql & IpcRendererOriginal

  interface Electron extends ElectronAPI {
    ipcRenderer: CustomIpcRenderer
  }
  interface Window {
    electron: Electron
  }
}
