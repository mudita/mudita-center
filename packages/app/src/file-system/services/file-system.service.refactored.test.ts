/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { vol } from "memfs"
import { FileSystemService } from "./file-system.service.refactored"

jest.mock("fs")

const subject = new FileSystemService()

beforeEach(() => {
  vol.reset()
})

describe("Method: createDirectory", () => {
  test("creates new directory", async () => {
    vol.fromJSON({}, "/tmp")

    expect(await vol.existsSync("/tmp/test")).toBeFalsy()
    await subject.createDirectory("/tmp/test", true)
    expect(await vol.existsSync("/tmp/test")).toBeTruthy()
  })
})

describe("Method: exists", () => {
  test("returns `true` if directory exists", async () => {
    expect(await subject.exists("/tmp")).toBeFalsy()
    await vol.mkdirSync("/tmp")
    expect(await subject.exists("/tmp")).toBeTruthy()
  })

  test("returns `true` if file exists", async () => {
    expect(await subject.exists("/tmp/text.txt")).toBeFalsy()

    vol.fromJSON(
      {
        "text.txt": "Hello world",
      },
      "/tmp"
    )

    expect(await subject.exists("/tmp/text.txt")).toBeTruthy()
  })

  test("returns `true` if directory exists", async () => {
    expect(await subject.exists("/tmp")).toBeFalsy()
  })

  test("returns `true` if file exists", async () => {
    expect(await subject.exists("/tmp/text.txt")).toBeFalsy()
  })
})

describe("Method: writeFile", () => {
  test("writes provided content for file", async () => {
    await vol.mkdirSync("/tmp")
    await subject.writeFile("/tmp/test.txt", "Hello world!")
    expect(await vol.readFileSync("/tmp/test.txt").toString("utf-8")).toEqual(
      "Hello world!"
    )
  })
})

describe("Method: readFile", () => {
  test("returns `true` if directory exists", async () => {
    await vol.mkdirSync("/tmp")
    await vol.writeFileSync("/tmp/test.txt", "Hello world!")
    expect(
      await (await subject.readFile("/tmp/test.txt")).toString("utf-8")
    ).toEqual("Hello world!")
  })
})
