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

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    expect(await vol.existsSync("/tmp/test")).toBeFalsy()
    await subject.createDirectory("/tmp/test", true)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    expect(await vol.existsSync("/tmp/test")).toBeTruthy()
  })
})

describe("Method: exists", () => {
  test("returns `true` if directory exists", async () => {
    expect(await subject.exists("/tmp")).toBeFalsy()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await vol.mkdirSync("/tmp")
    await subject.writeFile("/tmp/test.txt", "Hello world!")
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    expect(await vol.readFileSync("/tmp/test.txt").toString("utf-8")).toEqual(
      "Hello world!"
    )
  })
})

describe("Method: readFile", () => {
  test("returns `true` if directory exists", async () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await vol.mkdirSync("/tmp")
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await vol.writeFileSync("/tmp/test.txt", "Hello world!")
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await (await subject.readFile("/tmp/test.txt")).toString("utf-8")
    ).toEqual("Hello world!")
  })
})
