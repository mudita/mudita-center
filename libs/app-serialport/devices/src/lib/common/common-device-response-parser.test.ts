/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortStream } from "@serialport/stream"
import { MockBinding } from "@serialport/binding-mock"
import { CommonDeviceResponseParser } from "./common-device-response-parser"
import { waitFor } from "@testing-library/react"

let serialport: SerialPortStream
let parser: CommonDeviceResponseParser

beforeEach(() => {
  MockBinding.createPort("/dev/ROBOT", { echo: true, record: true })

  serialport = new SerialPortStream({
    binding: MockBinding,
    path: "/dev/ROBOT",
    baudRate: 9600,
  })
  parser = serialport.pipe(
    new CommonDeviceResponseParser({ matcher: /#\d{9}/ })
  )
})

afterEach(() => {
  MockBinding.reset()
  serialport.destroy()
})

describe("CommonDeviceResponseParser", () => {
  describe("basic response parsing", () => {
    it("chunks should be concatenated until full response is received", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      serialport.push("#")
      serialport.push("0")
      serialport.push("0")
      serialport.push("0")
      serialport.push("0")
      serialport.push("0")
      serialport.push("0")
      serialport.push("0")
      serialport.push("0")
      serialport.push("3")
      serialport.push("F")
      serialport.push("o")
      serialport.push("o")

      await waitFor(() => {
        expect(dataListener).toHaveBeenCalledWith(Buffer.from("Foo"))
      })

      expect(dataListener).toHaveBeenCalledTimes(1)
    })

    it("buffer should be cleared after emitting response", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      serialport.push("#000000003Foo")

      await waitFor(() => {
        expect(dataListener).toHaveBeenCalledTimes(1)
      })

      expect(parser["buffer"]).toEqual(Buffer.alloc(0))
    })

    it("handles chunk with corrupted data before valid response", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      serialport.push("x")
      serialport.push("#000000003Foo")

      await waitFor(() => {
        expect(dataListener).toHaveBeenCalledWith(Buffer.from("Foo"))
      })

      expect(dataListener).toHaveBeenCalledTimes(1)
    })

    it("handles chunk with response header and no payload", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      serialport.push("#000000000")

      await waitFor(() => {
        expect(dataListener).not.toHaveBeenCalled()
      })
      expect(parser["buffer"]).toEqual(Buffer.alloc(0))
    })

    it("handles chunks with payload shorter than expected", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      serialport.push("x#000000003Fo")
      serialport.push("#000000003Bar")
      serialport.push("#000000003Baz")

      await waitFor(() => {
        expect(dataListener).toHaveBeenCalledTimes(2)
      })
      expect(dataListener).toHaveBeenNthCalledWith(1, Buffer.from("Fo#"))
      expect(dataListener).toHaveBeenNthCalledWith(2, Buffer.from("Baz"))
    })

    it("handles combined chunk with payload shorter than expected", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      serialport.push("x#000000003Fo#000000003Bar#000000003Baz")

      console.log(Buffer.from([70, 111, 35]).toString())

      await waitFor(() => {
        expect(dataListener).toHaveBeenCalledTimes(2)
      })
      expect(dataListener).toHaveBeenNthCalledWith(1, Buffer.from("Fo#"))
      expect(dataListener).toHaveBeenNthCalledWith(2, Buffer.from("Baz"))
    })

    it("handles chunk with payload longer than expected", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      serialport.push("#000000003FooBar")
      serialport.push("Baz")
      serialport.push("#000000004Fooo")

      await waitFor(() => {
        expect(dataListener).toHaveBeenNthCalledWith(1, Buffer.from("Foo"))
        expect(dataListener).toHaveBeenNthCalledWith(2, Buffer.from("Fooo"))
      })

      expect(parser["buffer"]).toEqual(Buffer.alloc(0))
    })
  })

  describe("realistic response parsing scenarios", () => {
    it("handles JSON response split into multiple chunks", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      const jsonResponse = JSON.stringify({ status: "ok", value: 42 })
      const responseHeader = `#${jsonResponse.length.toString().padStart(9, "0")}`
      const fullResponse = responseHeader + jsonResponse

      serialport.push(fullResponse.slice(0, 5))
      serialport.push(fullResponse.slice(5, 15))
      serialport.push(fullResponse.slice(15))

      await waitFor(() => {
        expect(dataListener).toHaveBeenCalledWith(Buffer.from(jsonResponse))
      })

      expect(dataListener).toHaveBeenCalledTimes(1)
    })

    it("handles JSON response with data similar to header format", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      const jsonResponse = JSON.stringify({ status: "ok", value: "#123" })
      const responseHeader = `#${jsonResponse.length.toString().padStart(9, "0")}`
      const fullResponse = responseHeader + jsonResponse

      serialport.push(fullResponse)

      await waitFor(() => {
        expect(dataListener).toHaveBeenCalledWith(Buffer.from(jsonResponse))
      })
      expect(dataListener).toHaveBeenCalledTimes(1)
    })

    it("handles JSON response with corrupted data before the header", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      const jsonResponse = JSON.stringify({ status: "ok", value: 42 })
      const responseHeader = `#${jsonResponse.length.toString().padStart(9, "0")}`
      const fullResponse = responseHeader + jsonResponse

      serialport.push("corrupted_data" + fullResponse)

      await waitFor(() => {
        expect(dataListener).toHaveBeenCalledWith(Buffer.from(jsonResponse))
      })
      expect(dataListener).toHaveBeenCalledTimes(1)
    })
  })

  it("handles response with multibyte characters", async () => {
    const dataListener = jest.fn()

    parser.on("data", dataListener)
    const jsonResponse = JSON.stringify({ status: "ok", value: "こんにちは" }) // "Hello" in Japanese
    const jsonResponseBuffer = Buffer.from(jsonResponse, "utf8")
    const responseHeader = `#${jsonResponseBuffer.length
      .toString()
      .padStart(9, "0")}`
    const fullResponse = Buffer.concat([
      Buffer.from(responseHeader, "utf8"),
      jsonResponseBuffer,
    ])

    await new Promise<void>((resolve) => {
      parser.write(fullResponse, () => resolve())
    })

    await waitFor(() => {
      expect(dataListener).toHaveBeenCalledWith(jsonResponseBuffer)
    })

    expect(dataListener).toHaveBeenCalledTimes(1)
  })
})
