/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs, { PathOrFileDescriptor, WriteFileOptions } from "fs"
import path from "path"
import tar from "tar-stream"
import stream, { Transform } from "stream"
import crypto from "crypto"
import { AppendIv } from "App/file-system/helpers/append-iv"
import CryptoFileService from "App/file-system/services/crypto-file-service/crypto-file-service"

export class FileSystemService {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async createDirectory(
    filePath: string,
    recursive = true
  ): Promise<string | undefined> {
    return fs.mkdirSync(filePath, {
      recursive,
    })
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async appendFile(
    filePath: PathOrFileDescriptor,
    data: string | Uint8Array,
    options?: WriteFileOptions
  ): Promise<void> {
    return fs.appendFileSync(filePath, data, options)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async exists(filePath: string): Promise<boolean> {
    return fs.existsSync(filePath)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async writeFile(
    filePath: string,
    data: string | Buffer | Uint8Array
  ): Promise<void> {
    return fs.writeFileSync(filePath, data)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async readFile(filePath: string): Promise<Buffer | Uint8Array> {
    return fs.readFileSync(filePath)
  }

  public async extractFile(filePath: string, cwd: string): Promise<string[]> {
    const input = new stream.PassThrough()
    const file = this.readFile(filePath)
    input.end(file)

    const entryFilePaths: string[] = []
    const extract = tar.extract({ allowUnknownFormat: true })

    extract.on("entry", function (header, inputStream, next) {
      const entryFilePath = path.join(cwd, header.name)
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

  public async validateEncryptedZippedFile(
    filePath: string,
    key: string
  ): Promise<boolean> {
    // `entered` flag is a workaround. Thrown error during on reading broken file is ignored by the stream package.
    let entered = false
    const input = new stream.PassThrough()
    const file = await this.readEncryptedFileViaKey(filePath, key)
    return new Promise((resolve) => {
      input.end(file)

      const extract = tar.extract({ allowUnknownFormat: true })

      extract.on("entry", function (header, inputStream, next) {
        inputStream.on("end", function () {
          entered = true
          next()
        })
        inputStream.on("error", function () {
          resolve(false)
        })
        inputStream.resume()
      })
      input.pipe(extract)

      void this.handleStreamFinish(input).then(() => resolve(entered))
    })
  }

  public async extractEncryptedFile(
    filePath: string,
    cwd: string,
    token: string
  ): Promise<string[]> {
    const input = new stream.PassThrough()
    const file = this.readFile(filePath)
    input.end(file)

    const entryFilePaths: string[] = []
    const extract = tar.extract({ allowUnknownFormat: true })

    extract.on("entry", function (header, inputStream, next) {
      const entryFilePath = path.join(cwd, header.name)
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

  public async readEncryptedFileViaKey(
    filePath: string,
    key: string
  ): Promise<Buffer | undefined> {
    const buffer = await this.readFile(filePath)
    return CryptoFileService.decrypt({ buffer, key })
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
          console.log("handleStreamFinish finish: ")
          resolve()
        })
        .on("error", function () {
          console.log("handleStreamFinish error: ")
          reject()
        })
    })
  }
}
