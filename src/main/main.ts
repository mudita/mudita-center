import startBackend from "Backend/bootstrap"
import { app, BrowserWindow, net } from "electron"
import * as path from "path"
import * as url from "url"
import { WINDOW_SIZE } from "./config"
import { ipcMain } from "electron-better-ipc"

let win: BrowserWindow | null

const installExtensions = async () => {
  const installer = require("electron-devtools-installer")
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"]

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log)
}

const createWindow = async () => {
  if (process.env.NODE_ENV !== "production") {
    await installExtensions()
  }

  win = new BrowserWindow({
    width: WINDOW_SIZE.width,
    height: WINDOW_SIZE.height,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  win.webContents.session.on("will-download", (event, item, webContents) => {
    item.setSavePath(
      app.getPath("userData") + "/downloads/" + item.getFilename()
    )

    item.on("updated", (updatedEvent, state) => {
      if (state === "interrupted") {
        console.log("Download is interrupted but can be resumed")
      } else if (state === "progressing") {
        if (item.isPaused()) {
          console.log("Download is paused")
        } else {
          const total = item.getTotalBytes()
          const received = item.getReceivedBytes()
          const percent = (received / total) * 100

          console.log(`Received bytes: ${received} from ${total} (${percent})`)
        }
      }
    })
    item.once("done", (finishedEvent, state) => {
      if (state === "completed") {
        console.log("Download successfully")
        console.log(item.savePath)
        ipcMain.sendToRenderers("download complete", {
          directory: item.savePath,
          totalBytes: item.getTotalBytes(),
        })
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })

  ipcMain.on("download", (e, args) => {
    win!.webContents.session.downloadURL(args.url)
  })

  ipcMain.on("web-request", (event, args) => {
    const request = net.request(args.url)
    request.on("response", response => {
      response.on("data", chunk => {
        event.reply("web-request-reply", JSON.parse(chunk.toString("utf-8")))
      })
    })
    request.end()
  })

  // Set trigger for file download
  // ipcMain.on("download", (event, info) => {
  //   download(win as BrowserWindow, info.url, info.properties).then(dl =>
  //     win!.webContents.send("download complete", dl.getSavePath())
  //   )
  // })

  if (process.env.NODE_ENV !== "production") {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1"
    win.loadURL(`http://localhost:2003`)
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    )
  }

  if (process.env.NODE_ENV !== "production") {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once("dom-ready", () => {
      win!.webContents.openDevTools()
    })
  }

  win.on("closed", () => {
    win = null
  })
}

app.on("ready", createWindow)
app.on("ready", startBackend)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (win === null) {
    createWindow()
  }
})
