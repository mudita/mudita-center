/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import tar from "tar-stream"
import path from "path"
import crypto from "crypto"
import { Transform } from "stream"
import CryptoFileService from "App/file-system/services/crypto-file-service/crypto-file-service"
import { AppendIv } from "App/file-system/helpers/append-iv"

export class FileSystemService {
  static streamToFile(input: Transform, filePath: string): Promise<string> {
    const output = fs.createWriteStream(filePath)
    input.pipe(output)
    return FileSystemService.handleStreamFinish(input).then(() => filePath)
  }

  static encryptAndStreamToFile(
    input: Transform,
    filePath: string,
    key: string
  ): Promise<string> {
    const output = fs.createWriteStream(filePath)
    const iv = crypto.randomBytes(16)
    const cipher = CryptoFileService.createCipheriv({ key, iv })
    const appendIv = new AppendIv(iv)
    input.pipe(cipher).pipe(appendIv).pipe(output)
    return FileSystemService.handleStreamFinish(input).then(() => filePath)
  }

  static encryptViaTokenAndStreamToFile(
    input: Transform,
    filePath: string,
    token: string
  ): Promise<string> {
    const output = fs.createWriteStream(filePath)
    const iv = crypto.randomBytes(16)
    const cipher = CryptoFileService.createCipherivViaToken({ token, iv })
    const appendIv = new AppendIv(iv)
    input.pipe(cipher).pipe(appendIv).pipe(output)
    return FileSystemService.handleStreamFinish(input).then(() => filePath)
  }

  static encryptViaTokenWithExtractionAndStreamToFiles(
    input: Transform,
    cwd: string,
    token: string
  ): Promise<string[]> {
    const entryFilePaths: string[] = []
    const extract = tar.extract({ allowUnknownFormat: true })

    extract.on("entry", function (header, inputStream, next) {
      const entryFilePath = path.join(cwd, header.name)
      const iv = crypto.randomBytes(16)
      const cipher = CryptoFileService.createCipherivViaToken({ token, iv })
      const appendIv = new AppendIv(iv)
      const output = fs.createWriteStream(entryFilePath)
      inputStream.pipe(cipher).pipe(appendIv).pipe(output)
      inputStream.on("end", function () {
        next()
      })
      inputStream.resume()
      entryFilePaths.push(entryFilePath)
    })

    input.pipe(extract)
    return FileSystemService.handleStreamFinish(input).then(
      () => entryFilePaths
    )
  }

  private static async handleStreamFinish(input: Transform): Promise<void> {
    return new Promise((resolve, reject) => {
      input
        .on("finish", function () {
          resolve()
        })
        .on("error", function () {
          reject()
        })
    })
  }
}
