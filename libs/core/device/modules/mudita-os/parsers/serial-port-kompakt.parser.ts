/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextEncoder } from "util"
import { RequestPayload, Response } from "Core/device/types/mudita-os"
import { SerialPortParserBase } from "Core/device/modules/mudita-os/parsers/serial-port-base.parser"
import { HeaderKompakt } from "Core/device/types/kompakt/header-kompakt.type"
import { PayloadKompakt } from "Core/device/types/kompakt/payload-kompakt.type"
import { BodyKompakt } from "Core/device/types/kompakt/body-kompakt.type"
import { PrefixKompakt } from "Core/device/constants/prefix-kompakt.constant"

export class SerialPortParserKompakt extends SerialPortParserBase {
  public parse(data: Buffer): Response<BodyKompakt> {
    try {
      const prefix = String.fromCharCode(data[0])

      if (prefix === PrefixKompakt.RESPONSE) {
        const headerSize = Number(data.subarray(1, 10).valueOf())
        const payloadSize = Number(data.subarray(10, 19).valueOf())

        const headerBuffer = data.subarray(19, 19 + headerSize)
        const payloadBuffer = data.subarray(
          19 + headerSize,
          19 + headerSize + payloadSize
        )

        const header = JSON.parse(headerBuffer.toString()) as HeaderKompakt
        const payload = this.parsePayload(payloadBuffer)

        const result = this.mapToResponse(header, payload)
        return result
      } else {
        throw new Error("Invalid or unknown data type")
      }
    } catch (ex) {
      throw new Error("Could not parse the response - ")
    }
  }

  private parsePayload(buffer: Buffer): PayloadKompakt {
    const payloadrSingleLine = buffer.toString().split("\n").join()
    const payloadDecoded = Buffer.from(payloadrSingleLine, "base64").toString()
    return JSON.parse(payloadDecoded) as PayloadKompakt
  }

  private mapToResponse(
    { status, uuid, ...headerRest }: HeaderKompakt,
    { message, ...kompaktRest }: PayloadKompakt
  ): Response<BodyKompakt> {
    return {
      status,
      body: {
        ...kompaktRest,
        ...headerRest,
      },
      error: message !== undefined ? { message } : undefined,
      uuid,
    } as Response<BodyKompakt>
  }

  public createRequest(payload: RequestPayload): string {
    const encoder = new TextEncoder()

    const {
      endpoint,
      method,
      offset = 0,
      limit = 1,
      uuid,
      ...payloadRest
    } = payload

    const headerAsString = JSON.stringify({
      endpoint,
      method,
      offset,
      limit,
      uuid,
    })
    const headerLength = String(encoder.encode(headerAsString).length).padStart(
      9,
      "0"
    )

    const { body, ...rest } = payloadRest
    const bodyAsString = JSON.stringify({ ...body, ...rest })
    const bodyLength = String(encoder.encode(bodyAsString).length).padStart(
      9,
      "0"
    )

    return `${PrefixKompakt.REQUEST}${headerLength}${bodyLength}${headerAsString}${bodyAsString}`
  }
}
