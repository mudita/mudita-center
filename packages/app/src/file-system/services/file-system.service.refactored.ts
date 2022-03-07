/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import path from "path"
import tar from "tar-stream"
import stream, { Transform } from "stream"
import crypto from "crypto"
import { AppendIv } from "App/file-system/helpers/append-iv"
import CryptoFileService from "App/file-system/services/crypto-file-service/crypto-file-service"

export class FileSystemService {
  public async createDirectory(
    filePath: string,
    recursive = true
  ): Promise<string | undefined> {
    return fs.mkdirSync(filePath, {
      recursive,
    })
  }

  public async exists(filePath: string): Promise<boolean> {
    return fs.existsSync(filePath)
  }

  public async writeFile(
    filePath: string,
    data: string | Buffer | Uint8Array
  ): Promise<void> {
    return fs.writeFileSync(filePath, data)
  }

  public async readFile(filePath: string): Promise<Buffer | Uint8Array> {
    return fs.readFileSync(filePath)
  }

  public async extractFile(
    sourceFile: string,
    destinationDirectory: string
  ): Promise<string[]> {
    const input = new stream.PassThrough()
    const file = this.readFile(sourceFile)
    input.end(file)

    const entryFilePaths: string[] = []
    const extract = tar.extract({ allowUnknownFormat: true })

    extract.on("entry", function (header, inputStream, next) {
      const entryFilePath = path.join(destinationDirectory, header.name)
      const output = fs.createWriteStream(entryFilePath)
      inputStream.pipe(output)
      inputStream.on("end", function () {
        next()
      })
      inputStream.resume()
      entryFilePaths.push(entryFilePath)
    })

    input.pipe(extract)

    return this.handleStreamFinish(input).then(() => entryFilePaths)
  }

  public async extractEncryptedFile(
    sourceFile: string,
    destinationDirectory: string,
    token: string
  ): Promise<string[]> {
    const input = new stream.PassThrough()
    const file = this.readFile(sourceFile)
    input.end(file)

    const entryFilePaths: string[] = []
    const extract = tar.extract({ allowUnknownFormat: true })

    extract.on("entry", function (header, inputStream, next) {
      const entryFilePath = path.join(destinationDirectory, header.name)
      const iv = crypto.randomBytes(16)
      const cipher = CryptoFileService.createCipherivViaToken({ token, iv })
      const appendIv = new AppendIv(iv)
      const output = fs.createWriteStream(entryFilePath)
      inputStream.pipe(cipher).pipe(appendIv).pipe(output)
      inputStream.pipe(output)
      inputStream.on("end", function () {
        next()
      })
      inputStream.resume()
      entryFilePaths.push(entryFilePath)
    })

    input.pipe(extract)

    return this.handleStreamFinish(input).then(() => entryFilePaths)
  }

  public async readEncryptedFile(
    filePath: string,
    token: string
  ): Promise<Buffer | undefined> {
    const buffer = await this.readFile(filePath)
    return CryptoFileService.decryptViaToken({ buffer, token })
  }

  public async writeEncryptedFile(
    filePath: string,
    data: Buffer | Uint8Array,
    token: string
  ): Promise<void> {
    const encryptedBuffer = CryptoFileService.encryptViaToken({
      buffer: data,
      token,
    })

    if (encryptedBuffer === undefined) {
      throw new Error("Encryption fails")
    }

    const fileDirectory = path.dirname(filePath)
    const directoryExists = await this.exists(fileDirectory)

    if (!directoryExists) {
      await this.createDirectory(fileDirectory)
    }

    return this.writeFile(filePath, encryptedBuffer)
  }

  private handleStreamFinish(input: Transform): Promise<void> {
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
