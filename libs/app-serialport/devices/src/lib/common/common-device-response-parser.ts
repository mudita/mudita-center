/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Transform, TransformCallback, TransformOptions } from "stream"
import { AppLogger } from "app-serialport/utils"

interface CommonDeviceParserOptions extends TransformOptions {
  matcher: RegExp
}

/**
 * CommonDeviceResponseParser is a Transform stream that processes incoming data
 * chunks and emits complete responses based on a specified matcher pattern
 * pointing to the beginning of a response along with its expected length.
 */
export class CommonDeviceResponseParser extends Transform {
  private readonly encoding: BufferEncoding = "utf8"
  private readonly matcher: RegExp
  private buffer = Buffer.alloc(0)

  constructor({ matcher, ...options }: CommonDeviceParserOptions) {
    super(options)
    this.matcher = matcher
    this.encoding = options.encoding || this.encoding
  }

  private sendResponse(data: Buffer, encoding = this.encoding) {
    this.push(Buffer.from(data), encoding)
  }

  private findHeaderInBuffer(): {
    headerIndex: number
    headerLength: number
    expectedLength: number
  } | null {
    const bufferData = this.buffer.toString(this.encoding)
    const headerMatch = bufferData.match(this.matcher)

    if (!headerMatch) {
      return null
    }

    const header = headerMatch[0]
    const expectedLength = parseInt(header.replace(/\D/g, ""), 10)
    // Convert string index to byte index
    const headerIndex = Buffer.byteLength(
      bufferData.slice(0, headerMatch.index || 0),
      this.encoding
    )
    const headerLength = Buffer.byteLength(header, this.encoding)

    return { headerIndex, headerLength, expectedLength }
  }

  private processBuffer(encoding = this.encoding) {
    const headerInfo = this.findHeaderInBuffer()

    if (!headerInfo) {
      // No valid header found, waiting for more data
      return false
    }

    const { headerIndex, headerLength, expectedLength } = headerInfo
    const totalNeededLength = headerIndex + headerLength + expectedLength

    if (this.buffer.length < totalNeededLength) {
      // Not enough data received yet, waiting for more data
      return false
    }

    // Extract the response data based on the header position and expected length (in bytes)
    const startIndex = headerIndex + headerLength
    const endIndex = startIndex + expectedLength
    const responseData = this.buffer.subarray(startIndex, endIndex)

    // Optionally, log any data before the header as buffer trash
    if (headerIndex > 0 && process.env.SERIALPORT_PARSER_LOGS_ENABLED === "1") {
      const trashData = this.buffer.subarray(0, headerIndex)
      AppLogger.log(
        "warn",
        `Buffer cleanup  (${trashData.length} bytes): '${trashData.toString()}'`,
        { color: "yellow" }
      )
    }

    // Emit the response data if it's not empty
    if (responseData.length > 0) {
      this.sendResponse(responseData, encoding)

      if (process.env.SERIALPORT_PARSER_LOGS_ENABLED === "1") {
        AppLogger.log(
          "silly",
          `Response parsed (${responseData.length} bytes): '${responseData.toString()}'`,
          {
            color: "green",
          }
        )
      }
    } else {
      if (process.env.SERIALPORT_PARSER_LOGS_ENABLED === "1") {
        AppLogger.log("warn", `Empty response`, { color: "gray" })
      }
    }

    // Clear the buffer of the processed response and any data before it
    this.buffer = this.buffer.subarray(endIndex)

    if (endIndex > 0 && process.env.SERIALPORT_PARSER_LOGS_ENABLED === "1") {
      AppLogger.log(
        "silly",
        `Buffer updated  (${this.buffer.length} bytes): '${this.buffer.toString()}'`,
        { color: "blue" }
      )
    }

    if (process.env.SERIALPORT_PARSER_LOGS_ENABLED === "1") {
      AppLogger.log("silly", "Waiting for more data...")
    }
    // Indicate that a whole response was processed and there might be more data to process in the buffer
    return true
  }

  _transform(
    chunk: Buffer,
    encoding = this.encoding,
    callback: TransformCallback
  ) {
    if (process.env.SERIALPORT_PARSER_LOGS_ENABLED === "1") {
      AppLogger.log(
        "silly",
        `Chunk received  (${chunk.toString().length} bytes): '${chunk.toString()}'`,
        { color: "magenta" }
      )
    }

    this.buffer = Buffer.concat([this.buffer, chunk])

    if (process.env.SERIALPORT_LOGS_ENABLED === "1") {
      AppLogger.log(
        "silly",
        `Buffer updated  (${this.buffer.length} bytes): '${this.buffer.toString()}'`,
        { color: "blue" }
      )
    }

    while (this.processBuffer(encoding)) {
      // Keep processing the buffer until no more complete responses can be parsed
    }

    callback()
  }
}
