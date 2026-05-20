/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortMock } from "serialport"
import { SerialPortError } from "app-serialport/utils"
import { SerialPortErrorType } from "app-serialport/models"
import { Transform } from "stream"
import { SerialPortHandler } from "./serial-port-handler"
import { waitFor } from "@testing-library/react"

jest.mock("serialport", () => {
  const { SerialPortMock } = jest.requireActual("serialport")
  return {
    SerialPort: SerialPortMock,
    SerialPortMock,
  }
})

describe("SerialPortHandler", () => {
  const openedHandlers: SerialPortHandler[] = []

  beforeEach(() => {
    SerialPortMock.binding.reset()
  })

  afterEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50))
    for (const handler of openedHandlers) {
      if (handler.isOpen) {
        await new Promise<void>((resolve) => {
          handler.close(() => resolve())
        })
      }
    }
    openedHandlers.length = 0
  })

  const createHandler = (
    path: string,
    options: Partial<ConstructorParameters<typeof SerialPortHandler>[0]> = {}
  ) => {
    SerialPortMock.binding.createPort(path)
    return new SerialPortHandler({
      path,
      baudRate: 115200,
      ...options,
    })
  }

  const openHandler = (handler: SerialPortHandler): Promise<void> => {
    openedHandlers.push(handler)
    return new Promise((resolve, reject) => {
      handler.open((err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  describe("constructor", () => {
    it("calls onOpen callback when port is opened", async () => {
      const onOpen = jest.fn()

      const handler = createHandler("/dev/test-open", { onOpen })
      handler.open()

      await waitFor(() => {
        expect(onOpen).toHaveBeenCalled()
      })
    })

    it("calls onClose callback when port is closed", async () => {
      const onClose = jest.fn()

      const handler = createHandler("/dev/test-close", { onClose })
      handler.open(() => {
        handler.close()
      })

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled()
      })
    })

    it("calls onError callback when error occurs", async () => {
      const onError = jest.fn()

      const handler = createHandler("/dev/test-error", { onError })
      handler.open(() => {
        handler.emit("error", new Error("Test error"))
      })

      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith(
          expect.objectContaining({ message: "Test error" })
        )
      })
    })

    it("creates handler with autoOpen set to false", () => {
      const handler = createHandler("/dev/test-auto-open")
      expect(handler.isOpen).toBe(false)
    })
  })

  describe("writeAsync", () => {
    it("calls parseRequest before writing", async () => {
      const parseRequestSpy = jest.fn((data: unknown) =>
        Buffer.from(JSON.stringify(data))
      )

      class CustomHandler extends SerialPortHandler {
        parseRequest = parseRequestSpy
      }

      SerialPortMock.binding.createPort("/dev/test-parse-request")
      const handler = new CustomHandler({
        path: "/dev/test-parse-request",
        baudRate: 115200,
      })

      await openHandler(handler)
      await handler.writeAsync({ test: "data" })

      expect(parseRequestSpy).toHaveBeenCalledWith({ test: "data" })
    })

    it("throws InvalidRequest error when parseRequest throws", async () => {
      class ThrowingHandler extends SerialPortHandler {
        parseRequest(_data: unknown) {
          throw new Error("Parse error")
        }
      }

      SerialPortMock.binding.createPort("/dev/test-throw")
      const handler = new ThrowingHandler({
        path: "/dev/test-throw",
        baudRate: 115200,
      })

      await openHandler(handler)

      await expect(handler.writeAsync({ test: "data" })).rejects.toThrow(
        SerialPortError
      )
      await expect(handler.writeAsync({ test: "data" })).rejects.toMatchObject({
        type: SerialPortErrorType.InvalidRequest,
      })
    })
  })

  describe("request", () => {
    class JsonParsingHandler extends SerialPortHandler {
      parseRequest(data: unknown) {
        return JSON.stringify(data)
      }
    }

    const createJsonHandler = (
      path: string,
      options: Partial<ConstructorParameters<typeof SerialPortHandler>[0]> = {}
    ) => {
      SerialPortMock.binding.createPort(path)
      return new JsonParsingHandler({
        path,
        baudRate: 115200,
        ...options,
      })
    }

    it("assigns unique id to each request", async () => {
      const mockParser = new Transform({
        transform(chunk, _encoding, callback) {
          callback(null, chunk)
        },
      })

      const handler = createJsonHandler("/dev/test-unique-id", {
        parser: mockParser,
      })

      await openHandler(handler)
      let capturedId: number | undefined
      const originalParseRequest = handler.parseRequest.bind(handler)
      handler.parseRequest = (data: unknown) => {
        const dataWithId = data as { id?: number }
        capturedId = dataWithId.id
        return originalParseRequest(data)
      }

      const requestPromise = handler.request({
        endpoint: "test",
        method: "GET",
      })

      await new Promise((resolve) => setTimeout(resolve, 20))

      expect(capturedId).toBeDefined()
      expect(typeof capturedId).toBe("number")
      ;(handler as unknown as SerialPortMock).port?.emitData(
        Buffer.from(JSON.stringify({ id: capturedId, status: 200 }))
      )

      await requestPromise
    })

    it("resolves with response body when matching response is received", async () => {
      const mockParser = new Transform({
        transform(chunk, _encoding, callback) {
          callback(null, chunk)
        },
      })

      const handler = createJsonHandler("/dev/test-response", {
        parser: mockParser,
      })

      await openHandler(handler)

      let capturedId: number | undefined
      const originalParseRequest = handler.parseRequest.bind(handler)
      handler.parseRequest = (data: unknown) => {
        const dataWithId = data as { id?: number }
        capturedId = dataWithId.id
        return originalParseRequest(data)
      }

      const requestPromise = handler.request({
        endpoint: "test",
        method: "GET",
      })

      await new Promise((resolve) => setTimeout(resolve, 20))
      ;(handler as unknown as SerialPortMock).port?.emitData(
        Buffer.from(
          JSON.stringify({ id: capturedId, status: 200, data: "test" })
        )
      )

      const result = await requestPromise
      expect(result).toMatchObject({ status: 200, data: "test" })
    })

    it("rejects with ResponseTimeout error when response is not received in time", async () => {
      const mockParser = new Transform({
        transform(chunk, _encoding, callback) {
          callback(null, chunk)
        },
      })

      const handler = createJsonHandler("/dev/test-timeout", {
        parser: mockParser,
      })

      await openHandler(handler)

      const requestPromise = handler.request({
        endpoint: "test",
        method: "GET",
        options: { timeout: 50 },
      })

      await expect(requestPromise).rejects.toThrow(SerialPortError)
      await expect(requestPromise).rejects.toMatchObject({
        type: SerialPortErrorType.ResponseTimeout,
      })
    })

    it("rejects with PortClosed error when port is closed during request", async () => {
      const mockParser = new Transform({
        transform(chunk, _encoding, callback) {
          callback(null, chunk)
        },
      })

      const handler = createJsonHandler("/dev/test-port-closed", {
        parser: mockParser,
      })

      await openHandler(handler)

      const requestPromise = handler.request({
        endpoint: "test",
        method: "GET",
        options: { timeout: 5000 },
      })

      setTimeout(() => handler.close(), 10)

      await expect(requestPromise).rejects.toThrow(SerialPortError)
      await expect(requestPromise).rejects.toMatchObject({
        type: SerialPortErrorType.PortClosed,
      })
    })

    it("ignores responses with non-matching id", async () => {
      const mockParser = new Transform({
        transform(chunk, _encoding, callback) {
          callback(null, chunk)
        },
      })

      const handler = createJsonHandler("/dev/test-non-matching", {
        parser: mockParser,
      })

      await openHandler(handler)

      let capturedId: number | undefined
      const originalParseRequest = handler.parseRequest.bind(handler)
      handler.parseRequest = (data: unknown) => {
        const dataWithId = data as { id?: number }
        capturedId = dataWithId.id
        return originalParseRequest(data)
      }

      const requestPromise = handler.request({
        endpoint: "test",
        method: "GET",
        options: { timeout: 100 },
      })

      await new Promise((resolve) => setTimeout(resolve, 20))
      const wrongId = (capturedId || 0) + 999
      ;(handler as unknown as SerialPortMock).port?.emitData(
        Buffer.from(JSON.stringify({ id: wrongId, status: 200 }))
      )

      await expect(requestPromise).rejects.toMatchObject({
        type: SerialPortErrorType.ResponseTimeout,
      })
    })

    it("uses custom requestIdKey when specified", async () => {
      class CustomIdHandler extends SerialPortHandler {
        readonly requestIdKey = "rid"

        parseRequest(data: unknown) {
          return JSON.stringify(data)
        }
      }

      const mockParser = new Transform({
        transform(chunk, _encoding, callback) {
          callback(null, chunk)
        },
      })

      SerialPortMock.binding.createPort("/dev/test-custom-id-key")
      const handler = new CustomIdHandler({
        path: "/dev/test-custom-id-key",
        baudRate: 115200,
        parser: mockParser,
      })

      await openHandler(handler)

      let capturedRid: number | undefined
      let hasId = false
      const originalParseRequest = handler.parseRequest.bind(handler)
      handler.parseRequest = (data: unknown) => {
        const dataWithRid = data as { rid?: number; id?: number }
        capturedRid = dataWithRid.rid
        hasId = "id" in dataWithRid
        return originalParseRequest(data)
      }

      const requestPromise = handler.request({
        endpoint: "test",
        method: "GET",
      })

      await new Promise((resolve) => setTimeout(resolve, 20))

      expect(capturedRid).toBeDefined()
      expect(hasId).toBe(false)
      ;(handler as unknown as SerialPortMock).port?.emitData(
        Buffer.from(JSON.stringify({ rid: capturedRid, status: 200 }))
      )

      const result = await requestPromise
      expect(result).toHaveProperty("status", 200)
    })
  })

  describe("parseRequest", () => {
    it("returns data unchanged by default", () => {
      const handler = createHandler("/dev/test-parse")

      const data = { test: "data" }
      const result = handler.parseRequest(data)

      expect(result).toBe(data)
    })
  })

  describe("getSubtype", () => {
    it("returns undefined by default", () => {
      const result = SerialPortHandler.getSubtype("1234", "5678")
      expect(result).toBeUndefined()
    })
  })

  describe("getProductsGroups", () => {
    it("returns array with vendor and product ids", () => {
      const result = SerialPortHandler.getProductsGroups()
      expect(result).toEqual([
        {
          vendorIds: [],
          productIds: [],
        },
      ])
    })
  })

  describe("response parsing", () => {
    class JsonParsingHandler extends SerialPortHandler {
      parseRequest(data: unknown) {
        return JSON.stringify(data)
      }
    }

    const createJsonHandler = (
      path: string,
      options: Partial<ConstructorParameters<typeof SerialPortHandler>[0]> = {}
    ) => {
      SerialPortMock.binding.createPort(path)
      return new JsonParsingHandler({
        path,
        baudRate: 115200,
        ...options,
      })
    }

    it("handles string id in response by converting to number", async () => {
      const mockParser = new Transform({
        transform(chunk, _encoding, callback) {
          callback(null, chunk)
        },
      })

      const handler = createJsonHandler("/dev/test-string-id", {
        parser: mockParser,
      })

      await openHandler(handler)

      let capturedId: number | undefined
      const originalParseRequest = handler.parseRequest.bind(handler)
      handler.parseRequest = (data: unknown) => {
        const dataWithId = data as { id?: number }
        capturedId = dataWithId.id
        return originalParseRequest(data)
      }

      const requestPromise = handler.request({
        endpoint: "test",
        method: "GET",
      })

      await new Promise((resolve) => setTimeout(resolve, 20))
      ;(handler as unknown as SerialPortMock).port?.emitData(
        Buffer.from(JSON.stringify({ id: String(capturedId), status: 200 }))
      )

      const result = await requestPromise
      expect(result).toHaveProperty("status", 200)
    })

    it("handles response without id by not resolving request", async () => {
      const mockParser = new Transform({
        transform(chunk, _encoding, callback) {
          callback(null, chunk)
        },
      })

      const handler = createJsonHandler("/dev/test-no-id", {
        parser: mockParser,
      })

      await openHandler(handler)

      const requestPromise = handler.request({
        endpoint: "test",
        method: "GET",
        options: { timeout: 100 },
      })

      await new Promise((resolve) => setTimeout(resolve, 20))
      ;(handler as unknown as SerialPortMock).port?.emitData(
        Buffer.from(JSON.stringify({ status: 200 }))
      )

      await expect(requestPromise).rejects.toMatchObject({
        type: SerialPortErrorType.ResponseTimeout,
      })
    })

    it("handles invalid JSON response by not resolving request", async () => {
      const mockParser = new Transform({
        transform(chunk, _encoding, callback) {
          callback(null, chunk)
        },
      })

      const handler = createJsonHandler("/dev/test-invalid-json", {
        parser: mockParser,
      })

      await openHandler(handler)

      const requestPromise = handler.request({
        endpoint: "test",
        method: "GET",
        options: { timeout: 100 },
      })

      await new Promise((resolve) => setTimeout(resolve, 20))
      ;(handler as unknown as SerialPortMock).port?.emitData(
        Buffer.from("invalid json")
      )

      await expect(requestPromise).rejects.toMatchObject({
        type: SerialPortErrorType.ResponseTimeout,
      })
    })
  })

  describe("static properties", () => {
    it("has empty matchingVendorIds by default", () => {
      expect(SerialPortHandler.matchingVendorIds).toEqual([])
    })

    it("has empty matchingProductIds by default", () => {
      expect(SerialPortHandler.matchingProductIds).toEqual([])
    })

    it("has nonSerialPortDevice set to false by default", () => {
      expect(SerialPortHandler.nonSerialPortDevice).toBe(false)
    })
  })
})
