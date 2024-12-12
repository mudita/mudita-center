import { ElectronAPI } from "@electron-toolkit/preload"
import { SerialPort } from "serialport"

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      SerialPort: {
        list: typeof SerialPort.list
      }
    }
  }
}
