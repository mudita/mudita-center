/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FileManagerFile,
  FileTransferResult,
  TransferErrorName,
} from "devices/common/ui"
import { AppError, AppResultFactory } from "app-utils/models"

let randomThrowError = false

export const handleTransferMock = async (file: FileManagerFile) => {
  console.log(`Transferred file: ${file.name}`)

  return new Promise<FileTransferResult>((resolve) => {
    setTimeout(() => {
      // randomThrowError = Math.random() < 1
      randomThrowError = Math.random() < 0.5
      if (randomThrowError) {
        // const transferErrorNames = Object.values(TransferErrorName)
        // const transferErrorNames = [TransferErrorName.Duplicate]
        const transferErrorNames = [TransferErrorName.NotEnoughMemory]
        // const transferErrorNames = [TransferErrorName.FileTooLarge]
        // const transferErrorNames = [TransferErrorName.UploadUnknown]
        // const transferErrorNames = [TransferErrorName.Cancelled]
        // const transferErrorNames = [
        //   TransferErrorName.Duplicate,
        //   TransferErrorName.NotEnoughMemory,
        //   TransferErrorName.FileTooLarge,
        //   TransferErrorName.UploadUnknown,
        //   TransferErrorName.Cancelled,
        // ]
        // const transferErrorNames = [
        //   TransferErrorName.Duplicate,
        //   TransferErrorName.FileTooLarge,
        // ]

        const type =
          transferErrorNames[
            Math.floor(Math.random() * transferErrorNames.length)
          ]
        console.log(
          `Error transferring file: ${file.name}, Error Type: ${type}`
        )
        resolve(
          AppResultFactory.failed(new AppError("", type), {
            memory: 123456789,
          })
        )
        return
      }
      console.log(`Successfully transferred file: ${file.name}`)
      resolve(AppResultFactory.success())
    }, 500)
  })
}
