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
  parser = serialport.pipe(new CommonDeviceResponseParser({ matcher: /#\d/g }))
})

afterEach(() => {
  MockBinding.reset()
  serialport.destroy()
})

describe("ApiDeviceParser", () => {
  it("handles single chunk being full response", async () => {
    const dataListener = jest.fn()

    parser.on("data", dataListener)
    serialport.push("#3Foo")

    await waitFor(() => {
      expect(dataListener).toHaveBeenCalledWith(Buffer.from("Foo"))
    })
  })

  it("handles response at the beginning of the chunk", async () => {
    const dataListener = jest.fn()

    parser.on("data", dataListener)
    serialport.push("#3FooBarBaz")

    await waitFor(() => {
      expect(dataListener).toHaveBeenNthCalledWith(1, Buffer.from("Foo"))
    })
  })

  it("handles response at the end of the chunk", async () => {
    const dataListener = jest.fn()

    parser.on("data", dataListener)
    serialport.push("oo#3Bar")

    await waitFor(() => {
      expect(dataListener).toHaveBeenNthCalledWith(1, Buffer.from("Bar"))
    })
  })

  it("handles response in the middle of the chunk", async () => {
    const dataListener = jest.fn()

    parser.on("data", dataListener)
    serialport.push("oo#3Bar#3Baz")

    await waitFor(() => {
      expect(dataListener).toHaveBeenNthCalledWith(1, Buffer.from("Bar"))
    })
  })

  it("handles multiple responses in a single chunk", async () => {
    const dataListener = jest.fn()

    parser.on("data", dataListener)
    serialport.push("#3Foo#3Bar#3Baz")

    await waitFor(() => {
      expect(dataListener).toHaveBeenNthCalledWith(1, Buffer.from("Foo"))
      expect(dataListener).toHaveBeenNthCalledWith(2, Buffer.from("Bar"))
      expect(dataListener).toHaveBeenNthCalledWith(3, Buffer.from("Baz"))
    })

    expect(dataListener).toHaveBeenCalledTimes(3)
  })

  it("handles response divided by chunks", async () => {
    const dataListener = jest.fn()

    parser.on("data", dataListener)
    serialport.push("#3F")
    serialport.push("oo")

    await waitFor(() => {
      expect(dataListener).toHaveBeenCalledWith(Buffer.from("Foo"))
    })

    expect(dataListener).toHaveBeenCalledTimes(1)
  })

  it("handles multiple responses divided by chunks", async () => {
    const dataListener = jest.fn().mockImplementation((chunk) => {
      return chunk
    })

    parser.on("data", dataListener)
    serialport.push("#3F")
    serialport.push("oo#3B")
    serialport.push("a")
    serialport.push("r")
    serialport.push("#3Baz")

    await waitFor(() => {
      expect(dataListener).toHaveBeenNthCalledWith(1, Buffer.from("Foo"))
      expect(dataListener).toHaveBeenNthCalledWith(2, Buffer.from("Bar"))
      expect(dataListener).toHaveBeenNthCalledWith(3, Buffer.from("Baz"))
    })

    expect(dataListener).toHaveBeenCalledTimes(3)
  })
})
