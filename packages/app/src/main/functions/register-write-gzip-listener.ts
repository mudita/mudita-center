/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import fs from "fs"
import archiver from "archiver"

export enum WriteGzipEvents {
  Write = "write-gzip",
}

export interface WriteGzipData {
  filePath: string
}

const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
})

const registerWriteGzipListener = (): void => {
  ipcMain.answerRenderer<WriteGzipData, boolean>(
    WriteGzipEvents.Write,
    async ({ filePath }) => {
      return new Promise((resolve) => {
        const output = fs.createWriteStream(`${filePath}.zip`)

        output.on("close", function () {
          console.log(archive.pointer() + " total bytes")
          console.log(
            "archiver has been finalized and the output file descriptor has closed."
          )
          resolve(true)
        })

        output.on("end", function () {
          console.log("Data has been drained")
        })

        archive.on("warning", function (err) {
          if (err.code === "ENOENT") {
            // log warning
          } else {
            // throw error
            throw err
          }
        })

        // good practice to catch this error explicitly
        archive.on("error", function (err) {
          throw err
        })

        archive.pipe(output)

        archive.directory(`${filePath}/`, false)

        void archive.finalize()
      })
    }
  )
}

export default registerWriteGzipListener
