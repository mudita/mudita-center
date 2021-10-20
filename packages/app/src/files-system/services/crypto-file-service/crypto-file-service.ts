/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import crypto, { BinaryToTextEncoding } from "crypto"

/**
 * You can get a list of hash types your OpenSSL supports by typing
 * `openssl list-cipher-commands` into the command line
 */
type HashAlgorithm = string
const defaultHashAlgorithm: HashAlgorithm = "sha256"

/**
 * You can get a list of hash types your OpenSSL supports by typing
 * `openssl list-message-digest-algorithms` into the command line
 */
type CipherAlgorithm = string
const defaultCipherAlgorithm: CipherAlgorithm = "aes-256-ctr"

export interface CryptoFileOption
  extends Pick<HashOptions, "key" | "encoding"> {
  buffer: Buffer
  cipherAlgorithm?: CipherAlgorithm
  hashAlgorithm?: HashAlgorithm
}

interface HashOptions {
  algorithm: HashAlgorithm
  key: string
  encoding?: BinaryToTextEncoding
}

class CryptoFileService {
  static encrypt({
    hashAlgorithm = defaultHashAlgorithm,
    cipherAlgorithm = defaultCipherAlgorithm,
    buffer,
    key,
    encoding,
  }: CryptoFileOption): Buffer | undefined {
    const hash = CryptoFileService.createHash({
      algorithm: hashAlgorithm,
      key,
      encoding,
    })
    // Create an initialization vector
    const iv = crypto.randomBytes(16)
    // Create a new cipher using the algorithm, hash, and iv
    const cipher = crypto.createCipheriv(cipherAlgorithm, hash, iv)

    // Create the new (encrypted) buffer
    return Buffer.concat([iv, cipher.update(buffer), cipher.final()])
  }

  static decrypt({
    hashAlgorithm = defaultHashAlgorithm,
    cipherAlgorithm = defaultCipherAlgorithm,
    buffer,
    key,
    encoding,
  }: CryptoFileOption): Buffer | undefined {
    const hash = CryptoFileService.createHash({
      algorithm: hashAlgorithm,
      key,
      encoding,
    })

    // Get the iv: the first 16 bytes
    const iv = buffer.slice(0, 16)
    // Get the rest
    buffer = buffer.slice(16)
    // Create a decipher
    const decipher = crypto.createDecipheriv(cipherAlgorithm, hash, iv)
    // Actually decrypt it
    return Buffer.concat([decipher.update(buffer), decipher.final()])
  }

  private static createHash({
    algorithm,
    key,
    encoding = "base64",
  }: HashOptions) {
    return crypto
      .createHash(algorithm)
      .update(key)
      .digest(encoding)
      .substr(0, 32)
  }
}

export default CryptoFileService
