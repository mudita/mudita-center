import { ElectronAPI } from "@electron-toolkit/preload"
import { SerialPort } from "serialport"
// import { SqlJsStatic } from "sql.js"

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      SerialPort: typeof SerialPort
      // SQL: {
      //   init: () => Promise<SqlJsStatic>
      // }
    }
  }
}
