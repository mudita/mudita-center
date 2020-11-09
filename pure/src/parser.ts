enum PacketType {
  invalid = '"',
  endpoint = 35,
  rawData = 36,
}

enum ParserState {
  none = -1,
  readingType = 0,
  readingSize = 1,
  readingPayload = 2,
}

export function createValidRequest(payload: any) {
  let requestStr = "#"
  const payloadAsString = JSON.stringify(payload)
  const sizeAsString = String(payloadAsString.length).padStart(9, "0")
  requestStr += sizeAsString
  requestStr += payloadAsString

  return requestStr
}

export async function portData(data: any): Promise<any> {
  return new Promise(resolve => {

    let parserState = ParserState.none
    let currentPacket = {
      type: PacketType.invalid,
      dataRaw: null,
      dataSizeToRead: Number(-1),
      dataSizeRead: Number(-1),
      dataObject: null,
    }
    // debug('got data on serial state: %d data: "%s"', parserState, data)

    function readType(arg: any) {
      // debug("readType() arg[0] = %s", arg[0])
      if (arg[0] == PacketType.endpoint || arg[0] == PacketType.rawData) {
      } else {
        throw new Error("Invalid or unknown data type")
      }
      parserState = ParserState.readingSize
    }

    function readSize(arg: any) {
      // debug('readSize sizeNumber = "%s"', arg.slice(1, 10))

      if (Number.isInteger(Number(arg.slice(1, 10)))) {
        currentPacket.dataSizeToRead = Number(arg.slice(1, 10).valueOf())
      } else {
        currentPacket.dataSizeToRead = Number(-1)
      }
      if (currentPacket.dataSizeToRead < 0) {
        throw new Error('Can\'t parse data size as number "%s"')
      }
      parserState = ParserState.readingPayload
    }

    function readPayload(arg: any) {
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
        parserState = ParserState.none
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
        parserState = ParserState.none
      } else if (slicedPayload.length > currentPacket.dataSizeToRead) {
        // multiple messages in this stream, read the first one and continue
        parserState = ParserState.none
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
        case ParserState.none:
        // @ts-ignore
        case ParserState.readingType:
          readType(data)
          break

        // @ts-ignore
        case ParserState.readingSize:
          readSize(data)
          break

        // @ts-ignore
        case ParserState.readingPayload:
          readPayload(data)
          break

        default:
          break
      }
    } while (parserState != ParserState.none)

    // debug("read end")
  })
}

export function getNewUUID() {
  return Math.floor(Math.random() * 10000)
}
