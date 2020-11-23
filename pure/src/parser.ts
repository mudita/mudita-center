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
  let requestStr = "#"
  const payloadAsString = JSON.stringify(payload)
  const sizeAsString = String(payloadAsString.length).padStart(9, "0")
  requestStr += sizeAsString
  requestStr += payloadAsString

  return requestStr
}

export const parseData = async (data: any): Promise<any> => {
  return new Promise((resolve) => {
    let parserState = ParserState.None
    const currentPacket = {
      type: PacketType.Invalid,
      dataRaw: null,
      dataSizeToRead: Number(-1),
      dataSizeRead: Number(-1),
      dataObject: null,
    }
    // debug('got data on serial state: %d data: "%s"', parserState, data)

    const readType = (arg: any): void => {
      // debug("readType() arg[0] = %s", arg[0])
      if (arg[0] == PacketType.Endpoint || arg[0] == PacketType.RawData) {
      } else {
        throw new Error("Invalid or unknown data type")
      }
      parserState = ParserState.ReadingSize
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

      // slice all data until the end of stream
      const slicedPayload = arg.slice(10, 10 + currentPacket.dataSizeToRead)

      // debug(
      //   'readPayload payload: "%s" payloadLength',
      //   slicedPayload,
      //   slicedPayload.length
      // )

      if (slicedPayload.length == currentPacket.dataSizeToRead) {
        // ideal situation all data is in
        parserState = ParserState.None
        // debug("readPayload got all data in one read")
        try {
          currentPacket.dataObject = JSON.parse(slicedPayload)
        } catch (syntaxError) {
          // debug("can't parse payload data as JSON, %s", syntaxError)
        }

        // debug("payload is a JSON object pass it to our application")
        resolve(JSON.parse(slicedPayload))
      } else if (slicedPayload.length < currentPacket.dataSizeToRead) {
        // debug("readPayload need to read more data from stream")
        currentPacket.dataRaw += slicedPayload
        parserState = ParserState.None
      } else if (slicedPayload.length > currentPacket.dataSizeToRead) {
        // multiple messages in this stream, read the first one and continue
        parserState = ParserState.None
        // debug("readPayload got all data in one read, but more data in stream")
        try {
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

export function getNewUUID() {
  return Math.floor(Math.random() * 10000)
}
/* eslint-enable */
