import { ipcRenderer } from "electron-better-ipc"
import { AppLogsEvents } from "App/main/functions/register-app-logs-listener"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { version } from "../../../package.json"
import os from "os"

export const getAppLogs = (): Promise<string> => {
  return ipcRenderer.callMain(AppLogsEvents.Get)
}

export const getFullAppLogs = async (): Promise<string> => {
  const messages = defineMessages({
    appVersion: {
      id: "component.modal.support.details.appVersion",
    },
    os: {
      id: "component.modal.support.details.os",
    },
    logs: {
      id: "component.modal.support.details.logs",
    },
  })

  const appLogs = await getAppLogs()
  const log = [
    `${intl.formatMessage(messages.appVersion)}: ${version}`,
    `${intl.formatMessage(
      messages.os
    )}: ${os.platform()} ${os.arch()}, ${os.release()}`,
    `${intl.formatMessage(messages.logs)}: \n${appLogs}`,
  ]

  return log.join("\n")
}
