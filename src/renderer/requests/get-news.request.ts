import { ipcRenderer } from "electron-better-ipc"
import { NewsEvents } from "App/main/functions/register-news-listener"
import { DefaultNewsItems } from "App/main/default-news-item"

export const getNews = (): Promise<DefaultNewsItems> => {
  return ipcRenderer.callMain(NewsEvents.Get)
}

export const updateNews = (): Promise<DefaultNewsItems> => {
  return ipcRenderer.callMain(NewsEvents.Update)
}
