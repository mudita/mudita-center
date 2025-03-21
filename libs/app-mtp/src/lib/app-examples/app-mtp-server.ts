/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import express, { Application, Request, Response, Router } from "express"
import bodyParser from "body-parser"
import http from "http"
import { AppMtp } from "../app-mtp"
import * as dotenv from "dotenv"

dotenv.config()
const appMtp = new AppMtp()

const app: Application = express()
const router: Router = Router()

app.use(bodyParser.json())

router.get("/get-devices", (req: Request, res: Response) => {
  appMtp.getDevices().then((devices) => {
    res.json(devices)
  })
})

router.get("/get-device-storages/:deviceId", (req: Request, res: Response) => {
  const { deviceId } = req.params
  appMtp.getDeviceStorages(deviceId).then((storages) => {
    res.json(storages)
  })
})

router.post("/upload-file", (req: Request, res: Response) => {
  appMtp.uploadFile(req.body).then((result) => {
    res.json(result)
  })
})

router.get("/upload-file-progress", (req: Request, res: Response) => {
  appMtp.getUploadFileProgress(req.body).then((result) => {
    res.json(result)
  })
})

app.use("/", router)

const server = http.createServer(app)
server.listen(3000, () => {
  console.log("[app-mtp-server] running at http://127.0.0.1:3000/")
})
