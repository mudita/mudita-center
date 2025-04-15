/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import { JsonStoreService } from "./json-store.service"

jest.mock("electron", () => ({
  app: {
    getPath: jest.fn().mockImplementation(() => "/mock/path"),
  },
}))
jest.mock("fs-extra", () => ({
  pathExistsSync: jest.fn().mockImplementation(() => false),
  readJsonSync: jest.fn(),
  writeJsonSync: jest.fn(),
}))

describe("JsonStoreService", () => {
  it("initializes with default data", () => {
    const writeJsonMock = jest
      .spyOn(fs, "writeJsonSync")
      .mockImplementation(() => undefined)
    const service = new JsonStoreService("test", {
      key: "value",
    })

    expect(service.get()).toEqual({ key: "value" })
    expect(writeJsonMock).toHaveBeenCalledWith(
      "/mock/path/test.json",
      { key: "value" },
      { spaces: 2 }
    )
  })

  it("initializes with existing data if file exists", () => {
    jest.spyOn(fs, "pathExistsSync").mockReturnValueOnce(true)
    jest.spyOn(fs, "readJsonSync").mockReturnValueOnce({ key: "existingValue" })

    const service = new JsonStoreService("test", {
      key: "defaultValue",
    })

    expect(service.get()).toEqual({ key: "existingValue" })
  })

  it("writes data to file when set is called", () => {
    const writeJsonMock = jest
      .spyOn(fs, "writeJsonSync")
      .mockImplementationOnce(() => undefined)
    const service = new JsonStoreService("test", {
      key: "value",
    })

    const newData = service.set({
      key: "newValue",
      nested: { key: "nestedValue" },
    })

    expect(newData).toEqual({
      key: "newValue",
      nested: { key: "nestedValue" },
    })
    expect(writeJsonMock).toHaveBeenCalledWith(
      "/mock/path/test.json",
      { key: "newValue", nested: { key: "nestedValue" } },
      { spaces: 2 }
    )
  })

  it("returns the entire data object when no path is provided", () => {
    const service = new JsonStoreService("test", {
      key: "value",
    })
    const result = service.get()

    expect(result).toEqual({ key: "value" })
  })

  it("returns the value at the specified path", () => {
    const service = new JsonStoreService("test", {
      key: { nested: "value" },
    })

    const result = service.get("key.nested")

    expect(result).toBe("value")
  })

  it("returns undefined for a non-existent path", () => {
    const service = new JsonStoreService("test", {
      key: "value",
    })

    // @ts-expect-error Not exist
    const result = service.get("nonExistentKey")

    expect(result).toBeUndefined()
  })

  it("returns a batch of values for specified paths", () => {
    const service = new JsonStoreService("test", {
      key: { nested: "value", anotherNested: "another value" },
      anotherKey: "anotherValue",
    })

    const result = service.getBatch("key.nested", "anotherKey")
    expect(result).toEqual({
      key: { nested: "value" },
      anotherKey: "anotherValue",
    })
  })
})
