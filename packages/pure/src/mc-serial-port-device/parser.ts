/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextEncoder } from "util"
import { RequestPayload } from "./types"

enum PacketType {
  Invalid = '"',
  Endpoint = 35,
  RawData = 36,
}

enum ParserState {
  None = -1,
  ReadingType = 0,
  ReadingSize = 1,
  ReadingPayload = 2,
}
export class Parser {
  type = PacketType.Invalid
  dataRaw = Buffer.alloc(0)
  dataSizeToRead = -1
  dataSizeAlreadyRead = -1
  dataSizeRead = -1
  dataObject = null
  needMoreData = false

  public async parseData(data: any): Promise<any> {
    return new Promise((resolve) => {
      let parserState = ParserState.None
      const readType = (arg: any): void => {
        if (arg[0] == PacketType.Endpoint || arg[0] == PacketType.RawData) {
          parserState = ParserState.ReadingSize
          this.dataSizeAlreadyRead = 0
          this.dataSizeToRead = 0
          this.dataRaw = Buffer.alloc(0)
        } else if (this.needMoreData) {
          parserState = ParserState.ReadingPayload
        } else {
          throw new Error("Invalid or unknown data type")
        }
      }

      const readSize = (arg: any): void => {
        if (Number.isInteger(Number(arg.slice(1, 10)))) {
          this.dataSizeToRead = Number(arg.slice(1, 10).valueOf())
        } else {
          this.dataSizeToRead = Number(-1)
        }
        if (this.dataSizeToRead < 0) {
          throw new Error(`Can't parse data size as number "%s"`)
        }
        parserState = ParserState.ReadingPayload
      }

      const readPayload = (arg: any): void => {
        let slicedPayload = 0

        if (!this.needMoreData)
          slicedPayload = arg.slice(10, 10 + this.dataSizeToRead)
        else slicedPayload = arg

        if (
          (!this.needMoreData &&
            // @ts-ignore
            slicedPayload.length == this.dataSizeToRead) ||
          (this.needMoreData &&
            // @ts-ignore
            slicedPayload.length + this.dataSizeAlreadyRead ==
              this.dataSizeToRead)
        ) {
          console.log("ideal situation all data is in: ")
          // ideal situation all data is in
          parserState = ParserState.None
          try {
            if (this.needMoreData) {
              this.dataRaw = Buffer.concat([
                this.dataRaw,
                // @ts-ignore
                slicedPayload,
              ])
              // @ts-ignore
              this.dataObject = JSON.parse(this.dataRaw)
            } else {
              // @ts-ignore
              this.dataObject = JSON.parse(slicedPayload)
            }
          } catch (syntaxError) {
            // debug("can't parse payload data as JSON, %s", syntaxError)
          }

          // debug("payload is a JSON object pass it to our application")
          this.needMoreData = false
          resolve(this.dataObject)
        } else if (
          // @ts-ignore
          slicedPayload.length + this.dataSizeAlreadyRead <
          this.dataSizeToRead
        ) {
          this.needMoreData = true
          this.dataRaw = Buffer.concat([
            this.dataRaw,
            // @ts-ignore
            slicedPayload,
          ])

          // @ts-ignore
          this.dataSizeAlreadyRead += slicedPayload.length

          parserState = ParserState.None

          resolve(undefined)
          // @ts-ignore
        } else if (slicedPayload.length > this.dataSizeToRead) {
          resolve(undefined)
        }
      }

      do {
        switch (parserState) {
          case ParserState.None:
          // @ts-ignore
          case ParserState.ReadingType:
            readType(data)
            break

          // @ts-ignore
          case ParserState.ReadingSize:
            readSize(data)
            break

          // @ts-ignore
          case ParserState.ReadingPayload:
            readPayload(data)
            break

          default:
            break
        }
      } while (parserState != ParserState.None)
      // debug("read end")
    })
  }

  static createValidRequest(payload: RequestPayload<any>): string {
    const encoder = new TextEncoder()

    let requestStr = "#"
    const payloadAsString = JSON.stringify(payload)
    const sizeAsString = String(
      encoder.encode(payloadAsString).length
    ).padStart(9, "0")
    requestStr += sizeAsString
    requestStr += payloadAsString

    return requestStr
  }

  static getNewUUID(): number {
    return Math.floor(Math.random() * 10000)
  }
}
