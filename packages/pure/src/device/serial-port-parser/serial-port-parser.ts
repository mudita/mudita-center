/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextEncoder } from "util"

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
/* eslint-disable */

export const createValidRequest = (payload: unknown): string => {
  const encoder = new TextEncoder()

  let requestStr = "#"
  const payloadAsString = JSON.stringify(payload)
  const sizeAsString = String(encoder.encode(payloadAsString).length).padStart(
    9,
    "0"
  )
  requestStr += sizeAsString
  requestStr += payloadAsString

  return requestStr
}

const currentPacket = {
  type: PacketType.Invalid,
  dataRaw: Buffer.alloc(0),
  dataSizeToRead: Number(-1),
  dataSizeAlreadyRead: Number(-1),
  dataSizeRead: Number(-1),
  dataObject: null,
  needMoreData: Boolean(false),
}

export const parseData = async (data: any): Promise<any> => {
  return new Promise((resolve) => {
    let parserState = ParserState.None
    // debug('got data on serial state: %d data: "%s"', parserState, data)
    const readType = (arg: any): void => {
      // debug("readType() arg[0] = %s", arg[0]);

      if (arg[0] == PacketType.Endpoint || arg[0] == PacketType.RawData) {
        parserState = ParserState.ReadingSize
        currentPacket.dataSizeAlreadyRead = 0
        currentPacket.dataSizeToRead = 0
        currentPacket.dataRaw = Buffer.alloc(0)
      } else if (currentPacket.needMoreData == true) {
        // debug ("readType: this is buffered raw data from serialport, read it")
        parserState = ParserState.ReadingPayload
      } else {
        throw new Error("Invalid or unknown data type")
      }
    }

    const readSize = (arg: any): void => {
      // debug('readSize sizeNumber = "%s"', arg.slice(1, 10))

      if (Number.isInteger(Number(arg.slice(1, 10)))) {
        currentPacket.dataSizeToRead = Number(arg.slice(1, 10).valueOf())
      } else {
        currentPacket.dataSizeToRead = Number(-1)
      }
      if (currentPacket.dataSizeToRead < 0) {
        throw new Error(`Can't parse data size as number "%s"`)
      }
      parserState = ParserState.ReadingPayload
    }

    const readPayload = (arg: any): void => {
      // debug("readPayload arg:%s", arg)
      let slicedPayload = 0

      // slice all data until the end of stream
      if (currentPacket.needMoreData != true)
        slicedPayload = arg.slice(10, 10 + currentPacket.dataSizeToRead)
      else slicedPayload = arg

      // debug("readPayload payloadLength %d parserState: %d dataSizeToRead: %d dataSizeAlreadyRead: %d",
      //   slicedPayload.length,
      //   parserState,
      //   currentPacket.dataSizeToRead,
      //   currentPacket.dataSizeAlreadyRead);

      /* if the parser state was needMoreData it means we git split data on serial port
         in case all the data is there (the data passed as arg + data already stored) parse it
         and pass it further. Otherwise collect more data from serial port until we have it all.
       */
      if (
        (!currentPacket.needMoreData &&
          // @ts-ignore
          slicedPayload.length == currentPacket.dataSizeToRead) ||
        (currentPacket.needMoreData &&
          // @ts-ignore
          slicedPayload.length + currentPacket.dataSizeAlreadyRead ==
            currentPacket.dataSizeToRead)
      ) {
        // ideal situation all data is in
        parserState = ParserState.None
        try {
          if (currentPacket.needMoreData == true) {
            currentPacket.dataRaw = Buffer.concat([
              currentPacket.dataRaw,
              // @ts-ignore
              slicedPayload,
            ])
            // @ts-ignore
            currentPacket.dataObject = JSON.parse(currentPacket.dataRaw)
          } else {
            // @ts-ignore
            currentPacket.dataObject = JSON.parse(slicedPayload)
          }
        } catch (syntaxError) {
          // debug("can't parse payload data as JSON, %s", syntaxError)
        }

        // debug("payload is a JSON object pass it to our application")
        currentPacket.needMoreData = false
        resolve(currentPacket.dataObject)
      } else if (
        // @ts-ignore
        slicedPayload.length + currentPacket.dataSizeAlreadyRead <
        currentPacket.dataSizeToRead
      ) {
        // debug("readPayload need to read more data from stream got %d need %d more",
        //   slicedPayload.length,
        //   currentPacket.dataSizeToRead - slicedPayload.length);

        currentPacket.needMoreData = true
        currentPacket.dataRaw = Buffer.concat([
          currentPacket.dataRaw,
          // @ts-ignore
          slicedPayload,
        ])

        // @ts-ignore
        currentPacket.dataSizeAlreadyRead += slicedPayload.length

        parserState = ParserState.None
        // @ts-ignore
      } else if (slicedPayload.length > currentPacket.dataSizeToRead) {
        // multiple messages in this stream, read the first one and continue
        parserState = ParserState.None
        // debug("readPayload got all data in one read, but more data in stream")
        try {
          // @ts-ignore
          currentPacket.dataObject = JSON.parse(slicedPayload)
        } catch (syntaxError) {
          // debug("can't parse payload data as JSON, %s", syntaxError)
        }

        // debug("payload is a JSON object pass it to our application")
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

export function getNewUUID(): number {
  return Math.floor(Math.random() * 10000)
}
/* eslint-enable */
