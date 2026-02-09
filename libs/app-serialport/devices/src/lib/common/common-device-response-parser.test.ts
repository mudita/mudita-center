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
    new CommonDeviceResponseParser({ matcher: /#\d{3}/ })
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
      serialport.push("#003Foo")

      await waitFor(() => {
        expect(dataListener).toHaveBeenCalledTimes(1)
      })

      expect(parser["buffer"]).toEqual(Buffer.alloc(0))
    })

    it("handles chunk with corrupted data before valid response", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      serialport.push("x")
      serialport.push("#003Foo")

      await waitFor(() => {
        expect(dataListener).toHaveBeenCalledWith(Buffer.from("Foo"))
      })

      expect(dataListener).toHaveBeenCalledTimes(1)
    })

    it("handles chunk with response header and no payload", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      serialport.push("#000")

      await waitFor(() => {
        expect(dataListener).not.toHaveBeenCalled()
      })
      expect(parser["buffer"]).toEqual(Buffer.alloc(0))
    })

    it("handles chunks with payload shorter than expected", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      serialport.push("x#003Fo#003Bar#003Baz")

      await waitFor(() => {
        expect(dataListener).toHaveBeenNthCalledWith(1, Buffer.from("Fo#"))
        expect(dataListener).toHaveBeenNthCalledWith(2, Buffer.from("Baz"))
      })
      expect(dataListener).toHaveBeenCalledTimes(2)
    })

    it("handles chunk with payload longer than expected", async () => {
      const dataListener = jest.fn()

      parser.on("data", dataListener)
      serialport.push("#003FooBar")
      serialport.push("Baz")
      serialport.push("#004Fooo")

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
      const responseHeader = `#${jsonResponse.length.toString().padStart(3, "0")}`
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
      const responseHeader = `#${jsonResponse.length.toString().padStart(3, "0")}`
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
      const responseHeader = `#${jsonResponse.length.toString().padStart(3, "0")}`
      const fullResponse = responseHeader + jsonResponse

      serialport.push("corrupted_data" + fullResponse)

      await waitFor(() => {
        expect(dataListener).toHaveBeenCalledWith(Buffer.from(jsonResponse))
      })
      expect(dataListener).toHaveBeenCalledTimes(1)
    })
  })
})
