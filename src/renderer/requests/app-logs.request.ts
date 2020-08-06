import { ipcRenderer } from "electron-better-ipc"
import { AppLogsEvents } from "App/main/functions/register-app-logs-listener"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { version } from "../../../package.json"
import os from "os"
import log from "Renderer/utils/log"
import { ElectronLog } from "electron-log"

export const getMainAppLogs = (): Promise<string> => {
  return ipcRenderer.callMain(AppLogsEvents.Get)
}

export const getRendererAppLogs = (): Promise<string> => {
  const path = (log as ElectronLog).transports.file.getFile().path
  return ipcRenderer.callMain(AppLogsEvents.Get, path)
}

export const getFullAppLogs = async (): Promise<string> => {
  const messages = defineMessages({
    appVersion: {
      id: "component.modal.support.details.appVersion",
    },
    os: {
      id: "component.modal.support.details.os",
    },
  })

  const mainAppLogs = await getMainAppLogs()

  const rendererAppLogs = await getRendererAppLogs()

  const logParts = [
    `${intl.formatMessage(messages.appVersion)}: ${version}`,
    `${intl.formatMessage(
      messages.os
    )}: ${os.platform()} ${os.arch()}, ${os.release()}`,
    `Main logs: \n${mainAppLogs}\n\nRenderer logs:\n${rendererAppLogs}`,
  ]

  return logParts.join("\n")
}
