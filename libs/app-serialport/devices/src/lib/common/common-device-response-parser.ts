/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Transform, TransformCallback, TransformOptions } from "stream"
import { AppLogger } from "app-serialport/utils"

interface CommonDeviceParserOptions extends TransformOptions {
  matcher: RegExp
  maxFrameLength?: number
  maxBufferLength?: number
}

/**
 * A `#` + 9 digit header can declare up to 999,999,999 bytes. Nothing this
 * transport carries comes close, so a frame that large is a corrupted length
 * prefix - and waiting for it to arrive would hold the connection open until
 * the device is re-plugged.
 */
const DEFAULT_MAX_FRAME_LENGTH = 8 * 1024 * 1024

/**
 * How much unparsable data may pile up before the parser stops trying to
 * re-sync and drops it.
 */
const DEFAULT_MAX_BUFFER_LENGTH = 2 * DEFAULT_MAX_FRAME_LENGTH

/**
 * Kept when dropping unparsable data, so a header split across the boundary
 * is still found once the rest of it arrives.
 */
const HEADER_LOOKBEHIND_LENGTH = 64

/**
 * A limit that is not a finite, non-negative number would silently disable the
 * bound it stands for - `expectedLength > NaN` is false for every frame - so a
 * bad value falls back to the default instead of being taken at face value.
 */
const toLengthLimit = (
  value: number | undefined,
  fallback: number,
  name: string
) => {
  if (value === undefined) {
    return fallback
  }

  if (!Number.isFinite(value) || value < 0) {
    AppLogger.log(
      "warn",
      `Ignoring ${name}=${value}: a parser limit has to be a finite, non-negative number. Falling back to ${fallback}.`,
      { color: "yellow" }
    )
    return fallback
  }

  return value
}

/**
 * The matched header carries the payload length as its only run of digits.
 * Stripping every non-digit instead would splice separate runs together
 * (`#12x34` becomes 1234) and swallow a minus sign (`#-1` becomes 1), turning
 * a malformed header into a plausible looking length.
 */
const parseDeclaredLength = (header: string) => {
  const digitRuns = header.match(/\d+/g)

  if (!digitRuns || digitRuns.length !== 1) {
    return null
  }

  const [digits] = digitRuns

  if (header[header.indexOf(digits) - 1] === "-") {
    return null
  }

  const declaredLength = Number(digits)

  return Number.isSafeInteger(declaredLength) ? declaredLength : null
}

/**
 * CommonDeviceResponseParser is a Transform stream that processes incoming data
 * chunks and emits complete responses based on a specified matcher pattern
 * pointing to the beginning of a response along with its expected length.
 */
export class CommonDeviceResponseParser extends Transform {
  private readonly encoding: BufferEncoding = "utf8"
  private readonly matcher: RegExp
  private readonly maxFrameLength: number
  private readonly maxBufferLength: number
  private buffer = Buffer.alloc(0)

  constructor({
    matcher,
    maxFrameLength = DEFAULT_MAX_FRAME_LENGTH,
    maxBufferLength = DEFAULT_MAX_BUFFER_LENGTH,
    ...options
  }: CommonDeviceParserOptions) {
    super(options)
    this.matcher = matcher
    this.maxFrameLength = toLengthLimit(
      maxFrameLength,
      DEFAULT_MAX_FRAME_LENGTH,
      "maxFrameLength"
    )
    this.maxBufferLength = toLengthLimit(
      maxBufferLength,
      DEFAULT_MAX_BUFFER_LENGTH,
      "maxBufferLength"
    )
    this.encoding = options.encoding || this.encoding
  }

  private sendResponse(data: Buffer, encoding = this.encoding) {
    this.push(Buffer.from(data), encoding)
  }

  private findHeaderInBuffer(): {
    headerIndex: number
    headerLength: number
    expectedLength: number | null
  } | null {
    const bufferData = this.buffer.toString(this.encoding)
    const headerMatch = bufferData.match(this.matcher)

    if (!headerMatch) {
      return null
    }

    const header = headerMatch[0]
    const expectedLength = parseDeclaredLength(header)
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
      this.dropUnparsableBuffer()
      return false
    }

    const { headerIndex, headerLength, expectedLength } = headerInfo

    if (expectedLength === null || expectedLength > this.maxFrameLength) {
      // A header the parser cannot read, or one declaring a length this far
      // out of range, is a corrupted prefix rather than a frame the device is
      // about to send. Skip past it and look for the next header instead of
      // waiting for data that will never arrive.
      AppLogger.log(
        "warn",
        `Discarding a response header declaring ${
          expectedLength === null
            ? "an unreadable length"
            : `${expectedLength} bytes`
        } (limit ${this.maxFrameLength} bytes). Re-syncing on the next header.`,
        { color: "yellow" }
      )
      this.buffer = this.buffer.subarray(headerIndex + headerLength)
      return true
    }

    const totalNeededLength = headerIndex + headerLength + expectedLength

    if (this.buffer.length < totalNeededLength) {
      // Not enough data received yet, waiting for more data. Anything before
      // the header is never going to be part of this frame, so drop it now
      // rather than carrying it until the frame completes.
      if (headerIndex > 0) {
        this.buffer = this.buffer.subarray(headerIndex)
      }
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

  /**
   * Without a header there is nothing to parse, and the buffer would otherwise
   * grow for as long as the device keeps sending data the parser cannot frame.
   */
  private dropUnparsableBuffer() {
    if (this.buffer.length <= this.maxBufferLength) {
      return
    }

    // Keeping more than the configured limit would make the limit meaningless,
    // and would make the dropped count negative.
    const lookbehindLength = Math.min(
      HEADER_LOOKBEHIND_LENGTH,
      this.maxBufferLength
    )
    const droppedLength = this.buffer.length - lookbehindLength

    AppLogger.log(
      "warn",
      `Dropping ${droppedLength} bytes of unparsable data: no response header found within ${this.maxBufferLength} bytes.`,
      { color: "yellow" }
    )

    this.buffer = Buffer.from(
      this.buffer.subarray(this.buffer.length - lookbehindLength)
    )
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
