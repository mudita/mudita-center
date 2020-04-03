import { app } from "electron"
import { name } from "../../../package.json"
import { ipcMain } from "electron-better-ipc"
import fs from "fs-extra"
import getDefaultNewsItems from "App/main/default-news-item"

export enum NewsEvents {
  Get = "get-news-items",
}

const registerNewsListener = () => {
  const defaultNews = getDefaultNewsItems()
  const settingsFilePath = `${app.getPath(
    "appData"
  )}/${name}/default-news-items.json`

  if (!fs.readJsonSync(settingsFilePath, { throws: false })) {
    fs.writeJsonSync(settingsFilePath, defaultNews)
  }

  ipcMain.answerRenderer(NewsEvents.Get, () => {
    return fs.readJson(settingsFilePath)
  })
}

export default registerNewsListener
