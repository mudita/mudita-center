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

router.get("/get-device-storages", (req: Request, res: Response) => {
  const deviceId = req.body.deviceId
  appMtp.getDeviceStorages(deviceId).then((result) => {
    res.json(result)
  })
})

router.post("/upload-file", (req: Request, res: Response) => {
  appMtp.uploadFile(req.body).then((result) => {
    res.json(result)
  })
})

router.post("/export-file", (req: Request, res: Response) => {
  appMtp.exportFile(req.body).then((result) => {
    res.json(result)
  })
})

router.get("/transferred-file-progress", (req: Request, res: Response) => {
  appMtp.getTransferredFileProgress(req.body).then((result) => {
    res.json(result)
  })
})

router.get("/cancel-upload", (req: Request, res: Response) => {
  appMtp.cancelFileTransfer(req.body).then((result) => {
    res.json(result)
  })
})

app.use("/", router)

const server = http.createServer(app)
server.listen(3000, () => {
  console.log("[app-mtp-server] running at http://127.0.0.1:3000/")
})
