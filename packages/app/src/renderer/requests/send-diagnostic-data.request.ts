/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Client } from "ssh2"
import { Readable } from "stream"
import { noop } from "Renderer/utils/noop"
import logger from "App/main/utils/logger"

const env = process.env.NODE_ENV
const host = process.env.STORAGE_HOST
const port = Number(process.env.STORAGE_PORT) || 22
const username = process.env.STORAGE_USERNAME
const privateKey = process.env.STORAGE_PRIVATE_KEY

const mockSendDiagnosticDataRequest = (
  _data: SendDiagnosticData
): Promise<boolean> => {
  return Promise.resolve(true)
}

export interface SendDiagnosticData {
  fileName: string
  buffer: Buffer
  serialNumber: string
}

const sendDiagnosticDataRequest = async ({
  fileName,
  buffer,
  serialNumber,
}: SendDiagnosticData): Promise<boolean> => {
  if (!host || isNaN(port) || !username || !privateKey) {
    logger.error(
      `Send Diagnostic Data: send isn't possible. Please set envs.`
    )
    return false
  }

  const ssh2Client = new Client()
  ssh2Client.connect({
    host,
    port,
    username,
    privateKey,
  })

  return new Promise((resolve) => {
    ssh2Client.on("ready", () => {
      ssh2Client.sftp((error, sftp) => {
        if (error) {
          resolve(false)
          return
        }

        sftp.mkdir(`upload/${serialNumber}`, noop)

        const write = sftp.createWriteStream(
          `upload/${serialNumber}/${fileName}`
        )
        const readable = new Readable()

        readable._read = noop
        readable.push(buffer)
        readable.push(null)
        readable.pipe(write)
        write.on("finish", () => {
          sftp.end()
          resolve(true)
        })
        write.on("error", () => {
          resolve(true)
        })
      })
    })
    ssh2Client.on("error", (error) => {
      if (error) {
        resolve(false)
      }
    })
  })
}

export default (() => {
  if (env === "production") {
    return sendDiagnosticDataRequest
  } else {
    return mockSendDiagnosticDataRequest
  }
})()
