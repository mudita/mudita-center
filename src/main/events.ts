import { app, net } from "electron"
import { ipcMain } from "electron-better-ipc"
import { BrowserWindow } from "electron"
import {
  DownloadStatus,
  OSDownloadProgressing,
} from "Renderer/requests/download-os-update.request"

export default (win: BrowserWindow) => {
  win.webContents.session.on("will-download", (event, item, webContents) => {
    const onDownloadCancel = () => {
      item.cancel()
    }

    item.setSavePath(
      app.getPath("userData") + "/downloads/" + item.getFilename()
    )

    ipcMain.once("cancel-download", onDownloadCancel)

    item.on("updated", (_, state) => {
      const total = item.getTotalBytes()
      const received = item.getReceivedBytes()
      const percent = Math.round((received / total) * 100)
      const startTime = Math.round(item.getStartTime())
      const lastUpdate = new Date().getTime() / 1000
      const timeDiff = lastUpdate - startTime
      const timeLeft = (timeDiff / percent) * (100 - percent)

      const progress: OSDownloadProgressing = {
        status: state,
        data: {
          total,
          received,
          percent,
          timeLeft,
        },
      }

      if (item.isPaused()) {
        progress.status = DownloadStatus.Paused
      }

      ipcMain.sendToRenderers("download-progress", progress)
    })

    item.once("done", (_, state) => {
      ipcMain.removeListener("cancel-download", onDownloadCancel)
      ipcMain.sendToRenderers("download-finished", {
        status: state,
        directory: item.savePath,
        totalBytes: item.getTotalBytes(),
      })
    })
  })

  ipcMain.on("download", (e, { url }: { url: string }) => {
    win!.webContents.session.downloadURL(url)
  })

  ipcMain.on("os-update-request", event => {
    net
      .request(
        "https://mudita-desktop-app.s3-eu-central-1.amazonaws.com/pure-os/latest.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVLNHCTENZY3X4VS4/20200220/eu-central-1/s3/aws4_request&X-Amz-Date=20200220T165109Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=2206aee81a5bbf142a672579c106042e744b71933b031edfd8aafc7472b84361"
      )
      .once("response", response => {
        response.on("data", chunk => {
          event.reply("os-update-reply", JSON.parse(chunk.toString("utf-8")))
        })
      })
      .end()
  })
}
