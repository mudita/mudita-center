/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { AppMtp } from "../app-mtp"
import { MtpUploadFileData } from "../app-mtp.interface"

const appMtp = new AppMtp()

const handleAction = (action: string, parsedData: unknown) => {
  switch (action) {
    case "GET_DEVICES":
      appMtp
        .getDevices()
        .then((devices) => {
          console.log("[app-mtp-cli] output: ", devices)
        })
        .catch((err) => {
          console.error("[app-mtp-cli] output: Error fetching devices:", err)
        })
      break

    case "GET_DEVICE_STORAGES":
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

    case "UPLOAD_FILE":
      appMtp
        .uploadFile(parsedData as MtpUploadFileData)
        .then(() => {
          console.log("[app-mtp-cli] output: File uploaded successfully.")
        })
        .catch((err) => {
          console.error("[app-mtp-cli] output: Error uploading file:", err)
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
        const parsedData = JSON.parse(jsonString)
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
