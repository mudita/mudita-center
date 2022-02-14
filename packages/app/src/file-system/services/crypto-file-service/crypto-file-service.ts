/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import crypto, { BinaryToTextEncoding, Cipher } from "crypto"

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

export interface CryptoFileOptions
  extends Pick<TokenOptions, "key" | "encoding"> {
  cipherAlgorithm?: CipherAlgorithm
  hashAlgorithm?: HashAlgorithm
  buffer: Buffer | Uint8Array
}

interface BaseCipherivOptions {
  cipherAlgorithm?: CipherAlgorithm
  iv: Buffer
}

export interface CipherivOptions
  extends Pick<TokenOptions, "key" | "encoding">,
    BaseCipherivOptions {
  hashAlgorithm?: HashAlgorithm
}

export interface CipherivOptionViaTokenOptions extends BaseCipherivOptions {
  token: string
}

export interface CryptoFileViaTokenOptions {
  cipherAlgorithm?: CipherAlgorithm
  token: string
  buffer: Buffer | Uint8Array
}

export interface TokenOptions {
  algorithm?: HashAlgorithm
  key: string
  encoding?: BinaryToTextEncoding
}

class CryptoFileService {
  static encrypt({
    cipherAlgorithm,
    hashAlgorithm,
    buffer,
    key,
    encoding,
  }: CryptoFileOptions): Buffer | undefined {
    const token = CryptoFileService.createToken({
      algorithm: hashAlgorithm,
      key,
      encoding,
    })
    const iv = crypto.randomBytes(16)
    const cipher = CryptoFileService.createCipherivViaToken({
      token,
      iv,
      cipherAlgorithm,
    })
    return Buffer.concat([iv, cipher.update(buffer), cipher.final()])
  }

  static decrypt({
    cipherAlgorithm = defaultCipherAlgorithm,
    hashAlgorithm,
    buffer,
    key,
    encoding,
  }: CryptoFileOptions): Buffer | undefined {
    const token = CryptoFileService.createToken({
      algorithm: hashAlgorithm,
      key,
      encoding,
    })
    const iv = buffer.slice(0, 16)
    buffer = buffer.slice(16)
    const decipher = crypto.createDecipheriv(cipherAlgorithm, token, iv)
    return Buffer.concat([decipher.update(buffer), decipher.final()])
  }

  static decryptViaToken({
    cipherAlgorithm = defaultCipherAlgorithm,
    buffer,
    token,
  }: CryptoFileViaTokenOptions): Buffer | undefined {
    const iv = buffer.slice(0, 16)
    buffer = buffer.slice(16)
    const decipher = crypto.createDecipheriv(cipherAlgorithm, token, iv)
    return Buffer.concat([decipher.update(buffer), decipher.final()])
  }

  static encryptViaToken({
    cipherAlgorithm = defaultCipherAlgorithm,
    buffer,
    token,
  }: CryptoFileViaTokenOptions): Buffer | undefined {
    const iv = crypto.randomBytes(16)
    const cipher = CryptoFileService.createCipherivViaToken({
      token,
      iv,
      cipherAlgorithm,
    })
    return Buffer.concat([iv, cipher.update(buffer), cipher.final()])
  }

  static createCipheriv({
    hashAlgorithm,
    key,
    encoding,
    ...rest
  }: CipherivOptions): Cipher {
    const token = CryptoFileService.createToken({
      algorithm: hashAlgorithm,
      key,
      encoding,
    })
    return CryptoFileService.createCipherivViaToken({ token, ...rest })
  }
  static createCipherivViaToken({
    cipherAlgorithm = defaultCipherAlgorithm,
    token,
    iv,
  }: CipherivOptionViaTokenOptions): Cipher {
    return crypto.createCipheriv(cipherAlgorithm, token, iv)
  }

  static createToken({
    algorithm = defaultHashAlgorithm,
    key,
    encoding = "base64",
  }: TokenOptions) {
    return crypto
      .createHash(algorithm)
      .update(key)
      .digest(encoding)
      .substr(0, 32)
  }
}

export default CryptoFileService
