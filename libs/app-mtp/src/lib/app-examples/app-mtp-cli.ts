/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { AppMtp } from "../app-mtp"
import { GetUploadFileProgress, MtpUploadFileData } from "../app-mtp.interface"
import * as dotenv from "dotenv"

dotenv.config()
const appMtp = new AppMtp()

enum MtpCliCommandAction {
  GET_DEVICES = "GET_DEVICES",
  GET_DEVICE_STORAGES = "GET_DEVICE_STORAGES",
  UPLOAD_FILE = "UPLOAD_FILE",
  GET_UPLOAD_FILE_PROGRESS = "GET_UPLOAD_FILE_PROGRESS",
}

interface MtpCliCommand {
  action: MtpCliCommandAction

  [key: string]: unknown
}

const handleAction = (action: MtpCliCommandAction, parsedData: unknown) => {
  switch (action) {
    case MtpCliCommandAction.GET_DEVICES:
      appMtp
        .getDevices()
        .then((devices) => {
          console.log("[app-mtp-cli] output: ", devices)
        })
        .catch((err) => {
          console.error("[app-mtp-cli] output: Error fetching devices:", err)
        })
      break

    case MtpCliCommandAction.GET_DEVICE_STORAGES:
      appMtp
        .getDeviceStorages(parsedData as string)
        .then((storages) => {
          console.log("[app-mtp-cli] output:", storages)
        })
        .catch((err) => {
          console.error(
            "[app-mtp-cli] output: Error fetching device storages:",
            err
          )
        })
      break

    case MtpCliCommandAction.UPLOAD_FILE:
      appMtp
        .uploadFile(parsedData as MtpUploadFileData)
        .then(() => {
          console.log("[app-mtp-cli] output: File uploaded successfully.")
        })
        .catch((err) => {
          console.error("[app-mtp-cli] output: Error uploading file:", err)
        })
      break

    case MtpCliCommandAction.GET_UPLOAD_FILE_PROGRESS:
      appMtp
        .getUploadFileProgress(parsedData as GetUploadFileProgress)
        .then((progress) => {
          console.log("[app-mtp-cli] output:", progress)
        })
        .catch((err) => {
          console.error(
            "[app-mtp-cli] output: Error fetching upload file progress:",
            err
          )
        })
      break

    default:
      console.error("[app-mtp-cli] output: Unknown action:", action)
  }
}

yargs(hideBin(process.argv))
  .middleware((argv) => {
    const jsonString = argv._[0] as string
    if (jsonString) {
      try {
        const parsedData: MtpCliCommand = JSON.parse(jsonString)
        console.log("[app-mtp-cli] input: ", parsedData)

        const { action } = parsedData

        handleAction(action, parsedData)
      } catch (error) {
        console.error("[app-mtp-cli] output: Invalid JSON string:", jsonString)
        console.error("[app-mtp-cli] output:", error)
      }
    } else {
      console.error("[app-mtp-cli] output: No JSON string provided.")
    }
  })
  .help().argv
