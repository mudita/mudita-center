import { LoggerFactory } from "App/core/factories"
import electron from "electron"
import { ipcMain } from "electron-better-ipc"
import { ApiSerialPortToRendererEvents } from "./models/device-communication-event.constant"

const logger = LoggerFactory.getInstance()

export type CallRendererEvent = ApiSerialPortToRendererEvents

export const callRenderer = (event: CallRendererEvent, payload?: unknown) => {
  const win = electron.BrowserWindow.getAllWindows().find((win) => win.id === 1)

  if (win) {
    logger.info(JSON.stringify({ event, payload }, null, 2))
    ipcMain.callRenderer(win, event, payload)
  } else {
    logger.info(
      JSON.stringify(
        { error: "Cannot identify main window", event, payload },
        null,
        2
      )
    )
  }
}
