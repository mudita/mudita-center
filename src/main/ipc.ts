import { app, net } from "electron"
import { ipcMain } from "electron-better-ipc"
import { BrowserWindow } from "electron"

export default (win: BrowserWindow) => {
  win.webContents.session.on("will-download", (event, item, webContents) => {
    item.setSavePath(
      app.getPath("userData") + "/downloads/" + item.getFilename()
    )

    item.on("updated", (_, state) => {
      const progress = {
        status: state as string,
        data: {
          total: item.getTotalBytes(),
          received: item.getReceivedBytes(),
        },
      }
      if (item.isPaused()) {
        progress.status = "paused"
      }
      ipcMain.sendToRenderers("download-progress", progress)
    })
    item.once("done", (_, state) => {
      ipcMain.sendToRenderers("download-finished", {
        status: state,
        directory: item.savePath,
        totalBytes: item.getTotalBytes(),
      })
    })
  })

  ipcMain.on("download", (e, { url }) => {
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
