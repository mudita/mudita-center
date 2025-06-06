/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DEFAULT_RESPONSES } from "e2e-mock-responses"
import { APIEndpoints } from "device/models"
import { getMockedDevices, mockDescriptor } from "./mock-descriptor"
import { AddKompaktResponse } from "./mock-descriptor-validators"

const path = "/dev/ttyUSB0"
const endpoint = APIEndpoints[0]
const method = "GET"

describe("MockDescriptor", () => {
  beforeEach(() => {
    mockDescriptor["_devices"] = []
    mockDescriptor["_mockResponsesPerDevice"] = {}
    mockDescriptor["_mockResponsesPerDeviceOnce"] = {}
  })

  describe("addKompakt", () => {
    test("adds a new kompakt device", () => {
      const devicePath = "/dev/ttyUSB0"
      const serialNumber = "123456"
      mockDescriptor.addKompakt({ path: devicePath, serialNumber })

      const devices = getMockedDevices()
      expect(devices).toHaveLength(1)
      expect(devices[0]).toMatchObject({
        path,
        serialNumber,
        manufacturer: "Mudita",
      })
    })

    test("does not add a duplicate device", () => {
      const device = { path: "/dev/ttyUSB0", serialNumber: "123456" }
      mockDescriptor.addKompakt(device)
      mockDescriptor.addKompakt(device)

      const devices = getMockedDevices()
      expect(devices).toHaveLength(1)
    })
  })

  describe("removeDevice", () => {
    test("removes a device by path", () => {
      const device = { path: "/dev/ttyUSB0", serialNumber: "123456" }
      mockDescriptor.addKompakt(device)

      mockDescriptor.removeDevice("/dev/ttyUSB0")
      const devices = getMockedDevices()
      expect(devices).toHaveLength(0)
    })
  })

  describe("addResponse and getResponse", () => {
    test("adds and retrieves a response for a device", async () => {
      const response: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { key: "value" },
      }
      mockDescriptor.addResponses([response])

      const result = await mockDescriptor.getResponse(
        path,
        endpoint,
        method,
        {}
      )
      expect(result).toEqual({ status: 200, body: { key: "value" } })
    })

    test("adds and retrieves a response with matching data", async () => {
      const response: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { key: "value" },
        match: { expected: { key: "value" } },
      }
      mockDescriptor.addResponses([response])

      const result = await mockDescriptor.getResponse(path, endpoint, method, {
        key: "value",
      })
      expect(result).toEqual({ status: 200, body: { key: "value" } })
    })

    test("adds a new response and filters out previous one without match", async () => {
      const firstResponse: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { key: "firstValue" },
        match: undefined,
      }
      mockDescriptor.addResponses([firstResponse])

      const secondResponse: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { key: "secondValue" },
        match: { expected: { key: "secondValue" } },
      }
      mockDescriptor.addResponses([secondResponse])

      const result = await mockDescriptor.getResponse(path, endpoint, method, {
        key: "secondValue",
      })
      expect(result).toEqual({ status: 200, body: { key: "secondValue" } })
    })

    test("does not retrieve a response if match does not pass", async () => {
      const response: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { key: "value" },
        match: { expected: { key: "notValue" } },
      }
      mockDescriptor.addResponses([response])

      const result = await mockDescriptor.getResponse(path, endpoint, method, {
        key: "otherValue",
      })
      expect(result).toEqual(DEFAULT_RESPONSES[endpoint]?.[method]?.[0])
    })

    test("includes the response without match if it's the last one added", async () => {
      const firstResponse: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { key: "firstValue" },
        match: undefined,
      }
      mockDescriptor.addResponses([firstResponse])

      const secondResponse: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { key: "secondValue" },
        match: undefined,
      }
      mockDescriptor.addResponses([secondResponse])

      const result = await mockDescriptor.getResponse(path, endpoint, method, {
        key: "secondValue",
      })
      expect(result).toEqual({ status: 200, body: { key: "secondValue" } })
    })

    test("returns default response if no custom response exists", async () => {
      const result = await mockDescriptor.getResponse(
        path,
        endpoint,
        method,
        {}
      )
      expect(result).toEqual(DEFAULT_RESPONSES[endpoint]?.[method]?.[0])
    })
  })

  describe("addResponseOnce and getResponse", () => {
    test("adds and retrieves a one-time response with matching data", async () => {
      const response: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { once: true, key: "value" },
        match: { expected: { key: "value" } },
      }
      mockDescriptor.addResponseOnce(response)

      const firstResult = await mockDescriptor.getResponse(
        path,
        endpoint,
        method,
        {
          key: "value",
        }
      )
      expect(firstResult).toEqual({
        status: 200,
        body: { once: true, key: "value" },
      })

      const secondResult = await mockDescriptor.getResponse(
        path,
        endpoint,
        method,
        {
          key: "value",
        }
      )
      expect(secondResult).toEqual(DEFAULT_RESPONSES[endpoint]?.[method]?.[0])
    })

    test("does not retrieve a one-time response if match does not pass", async () => {
      const response: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { once: true, key: "value" },
        match: { expected: { key: "notValue" } },
      }
      mockDescriptor.addResponseOnce(response)

      const result = await mockDescriptor.getResponse(path, endpoint, method, {
        key: "otherValue",
      })
      expect(result).toEqual(DEFAULT_RESPONSES[endpoint]?.[method]?.[0])
    })
  })

  describe("addResponseOnce", () => {
    test("adds a one-time response and removes it after retrieval", async () => {
      const response: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { once: true },
      }
      mockDescriptor.addResponseOnce(response)

      const firstResult = await mockDescriptor.getResponse(
        path,
        endpoint,
        method,
        {}
      )
      expect(firstResult).toEqual({ status: 200, body: { once: true } })

      const secondResult = await mockDescriptor.getResponse(
        path,
        endpoint,
        method,
        {}
      )
      expect(secondResult).toEqual(DEFAULT_RESPONSES[endpoint]?.[method]?.[0])
    })
  })

  describe("getResponse fallback to default", () => {
    test("returns default response if no per-device response exists", async () => {
      const result = await mockDescriptor.getResponse(
        "non-existing-path",
        endpoint,
        method,
        {}
      )
      expect(result).toEqual(DEFAULT_RESPONSES[endpoint]?.[method]?.[0])
    })
  })

  describe("match handling", () => {
    test("filters out previous response when both match objects are undefined", async () => {
      const firstResponse: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { key: "firstValue" },
        match: undefined,
      }
      mockDescriptor.addResponses([firstResponse])

      const secondResponse: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { key: "secondValue" },
        match: undefined,
      }
      mockDescriptor.addResponses([secondResponse])

      const filteredResponses = await mockDescriptor.getResponse(
        path,
        endpoint,
        method,
        {}
      )
      expect(filteredResponses).toEqual({
        status: 200,
        body: { key: "secondValue" },
      })
    })

    test("removes previous response when both match objects are identical", async () => {
      const firstResponse: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { key: "value" },
        match: { expected: { key: "value" } },
      }
      mockDescriptor.addResponses([firstResponse])

      const secondResponse: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { key: "value" },
        match: { expected: { key: "value" } },
      }
      mockDescriptor.addResponses([secondResponse])

      const filteredResponses = await mockDescriptor.getResponse(
        path,
        endpoint,
        method,
        { key: "value" }
      )
      expect(filteredResponses).toEqual({ status: 200, body: { key: "value" } })
    })
  })

  describe("compareObjectsWithWildcard", () => {
    test("returns default response when no exact match is found", async () => {
      const response1: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { id: "123", type: "admin" },
        match: { expected: { id: "123", type: "admin" } },
      }

      mockDescriptor.addResponses([response1])

      const result = await mockDescriptor.getResponse(path, endpoint, method, {
        id: "999",
        type: "admin",
      })

      expect(result).toEqual(DEFAULT_RESPONSES[endpoint]?.[method]?.[0])
    })

    test("returns response with __ANY__ is available", async () => {
      const response1: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { id: "123", type: "admin" },
        match: { expected: { id: "123", type: "admin" } },
      }

      const response2: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { id: "777", type: "admin" },
        match: { expected: { id: "__ANY__", type: "admin" } },
      }

      const response3: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { id: "999", type: "admin" },
        match: { expected: { id: "999", type: "admin" } },
      }

      mockDescriptor.addResponses([response1, response2, response3])

      const result = await mockDescriptor.getResponse(path, endpoint, method, {
        id: "999",
        type: "admin",
      })

      expect(result).toEqual({
        status: 200,
        body: { id: "777", type: "admin" },
      })
    })

    test("returns exact match response when found first even when __ANY__ is available", async () => {
      const response1: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { id: "123", type: "admin" },
        match: { expected: { id: "123", type: "admin" } },
      }

      const response2: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { id: "999", type: "admin" },
        match: { expected: { id: "999", type: "admin" } },
      }

      const response3: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { id: "777", type: "admin" },
        match: { expected: { id: "__ANY__", type: "admin" } },
      }

      mockDescriptor.addResponses([response1, response2, response3])

      const result = await mockDescriptor.getResponse(path, endpoint, method, {
        id: "999",
        type: "admin",
      })

      expect(result).toEqual({
        status: 200,
        body: { id: "999", type: "admin" },
      })
    })
  })

  describe("delayedResponseTest", () => {
    test("returns delayed response", async () => {
      const delay = 2000
      const response1: AddKompaktResponse = {
        path,
        endpoint,
        method,
        status: 200,
        body: { id: "666", type: "admin" },
        match: { expected: { id: "666", type: "admin" } },
        delay,
      }

      mockDescriptor.addResponses([response1])
      const start = Date.now()
      const result = await mockDescriptor.getResponse(
        response1.path,
        response1.endpoint,
        response1.method,
        response1.body
      )
      const end = Date.now()
      const duration = end - start
      expect(duration).toBeGreaterThanOrEqual(delay)
      expect(result).toEqual({
        status: response1.status,
        body: response1.body,
      })
    })
  })
})
