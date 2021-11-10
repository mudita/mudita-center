/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
} from "@aws-sdk/client-s3"
import logger from "App/main/utils/logger"
import { IpcUploader } from "App/uploader/constants"

const env = process.env.NODE_ENV

const region = process.env.AWS_REGION
const secretKey = process.env.AWS_SECRET_KEY
const accessKey = process.env.AWS_ACCESS_KEY_ID
const bucketName = process.env.S3_BUCKET

export interface UploaderData {
  fileName: string
  buffer: Buffer
  serialNumber: string
}

export const registerUploadFileListener = (): void => {
  ipcMain.answerRenderer(
    IpcUploader.UploadFile,
    async ({
      fileName,
      buffer,
      serialNumber,
    }: UploaderData): Promise<PutObjectCommandOutput | undefined> => {
      if (env !== "production") {
        return
      }

      const client = new S3Client({
        region,
        credentials: {
          accessKeyId: accessKey as string,
          secretAccessKey: secretKey as string,
        },
      })

      const filePath = `uploads/${serialNumber}/${fileName}`

      logger.info("Start sending file: ", filePath)

      const command = new PutObjectCommand({
        Key: filePath,
        Bucket: bucketName,
        Body: buffer,
      })

      try {
        const result = await client.send(command)
        logger.info("Successfully sended file")

        return result
      } catch (error) {
        logger.error("Sending file error: ", error)

        throw error
      }
    }
  )
}
