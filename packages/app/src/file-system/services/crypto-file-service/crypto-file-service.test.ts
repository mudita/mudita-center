/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import CryptoFileService from "App/file-system/services/crypto-file-service/crypto-file-service"
import fs from "fs"
import path from "path"

describe("CryptoFileService", () => {
  const key = "MySuperSecretKey"

  describe("when the buffer is a string", () => {
    const buffer = Buffer.from("message to encrypt")

    test("`encrypt` method should encrypt buffer", () => {
      const bufferEncrypted = CryptoFileService.encrypt({
        key,
        buffer,
      })
      expect(bufferEncrypted).not.toEqual(undefined)
      expect(buffer.toString()).not.toEqual(bufferEncrypted?.toString())
    })

    test("`decrypt` method should decrypt buffer", () => {
      const bufferEncrypted = CryptoFileService.encrypt({
        key,
        buffer,
      })

      const bufferDecrypted = CryptoFileService.decrypt({
        key,
        buffer: bufferEncrypted as Buffer,
      })

      expect(bufferDecrypted).not.toEqual(undefined)
      expect(buffer.toString()).toEqual(bufferDecrypted?.toString())
    })
  })

  describe("when the buffer contains file", () => {
    const buffer = fs.readFileSync(path.join(__dirname, "./data/image.jpg"))

    test("`encrypt` method should encrypt buffer", () => {
      const bufferEncrypted = CryptoFileService.encrypt({
        key,
        buffer,
      })
      expect(bufferEncrypted).not.toEqual(undefined)
      expect(buffer.toString()).not.toEqual(bufferEncrypted?.toString())
    })

    test("`decrypt` method should decrypt buffer", () => {
      const bufferEncrypted = CryptoFileService.encrypt({
        key,
        buffer,
      })

      const bufferDecrypted = CryptoFileService.decrypt({
        key,
        buffer: bufferEncrypted as Buffer,
      })

      expect(bufferDecrypted).not.toEqual(undefined)
      expect(buffer.toString()).toEqual(bufferDecrypted?.toString())
    })
  })
})
