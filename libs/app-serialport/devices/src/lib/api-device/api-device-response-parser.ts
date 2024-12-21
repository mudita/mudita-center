/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Transform, TransformCallback, TransformOptions } from "stream"

interface ApiDeviceParserOptions extends TransformOptions {
  matcher: RegExp
}

/**
 * ApiDeviceParser is a Transform stream that processes incoming data chunks
 * and emits complete responses based on a specified matcher pattern
 * that points to the beginning of a response along with its expected length.
 */
export class ApiDeviceResponseParser extends Transform {
  private readonly encoding: BufferEncoding = "utf8"
  private readonly matcher: RegExp
  private buffer = Buffer.alloc(0)
  private bufferExpectedLength = 0

  constructor({ matcher, ...options }: ApiDeviceParserOptions) {
    super(options)
    this.matcher = matcher
    this.encoding = options.encoding || this.encoding
  }

  private isFullResponse(buffer = this.buffer) {
    return (
      this.bufferExpectedLength > 0 &&
      buffer.length === this.bufferExpectedLength
    )
  }

  private sendResponse(buffer: Buffer, encoding = this.encoding) {
    const data = buffer.toString().replace(this.matcher, "")
    this.push(Buffer.from(data), encoding)
    this.buffer = Buffer.alloc(0)
    this.bufferExpectedLength = 0
  }

  _transform(
    chunk: Buffer,
    encoding = this.encoding,
    callback: TransformCallback
  ) {
    const chunkData = chunk.toString()
    const allMatches = Array.from(chunkData.matchAll(this.matcher))

    // If chunk contains new response header
    if (allMatches.length > 0) {
      // Loop through all matches of the header
      for (const [index, match] of Object.entries(allMatches)) {
        // If the first found header is not at the beginning of the chunk
        if (index === "0" && match.index > 0 && this.buffer.length > 0) {
          // Get the payload before the first header and add it to the buffer of previous response
          const payload = Buffer.concat([
            new Uint8Array(this.buffer),
            new Uint8Array(Buffer.from(chunkData.slice(0, match.index))),
          ])
          // Emit the previous response if it's full and clear the buffer
          if (this.isFullResponse(payload)) {
            this.sendResponse(payload, encoding)
          }
        }

        // Get the n-th header and attached payload of the response
        const header = match[0]
        // Calculate the expected length of the response
        this.bufferExpectedLength =
          parseInt(header.replaceAll(/\D/g, "")) + header.length
        // Extract the payload from the chunk
        const payload = Buffer.from(
          chunkData.slice(match.index, match.index + this.bufferExpectedLength)
        )

        // If full response is sent, emit it and clear the buffer
        if (this.isFullResponse(payload)) {
          this.sendResponse(payload, encoding)
        }
        // Otherwise, save the payload to the buffer
        else {
          this.buffer = payload
        }
      }
    }
    // If chunk doesn't contain new response header
    else {
      // Concatenate the chunk with the saved buffer
      const payload = Buffer.concat([
        new Uint8Array(this.buffer),
        new Uint8Array(chunk),
      ])
      // If full response is sent, emit it and clear the buffer
      if (this.isFullResponse(payload)) {
        this.sendResponse(payload, encoding)
      }
      // Otherwise, save the payload to the buffer and wait for the next chunk
      else {
        this.buffer = payload
      }
    }
    callback()
  }
}
