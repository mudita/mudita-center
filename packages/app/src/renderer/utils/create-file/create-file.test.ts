/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import createFile from "Renderer/utils/create-file/create-file"

describe("Create File util", () => {
  test("should return value of File type", async () => {
    const file = createFile(path.join(__dirname, "./file.txt"))
    expect(file instanceof File).toBe(true)
  })
  test("should create file with default type property", async () => {
    const file = createFile(path.join(__dirname, "./file.txt"))
    expect(file.type).toBe("text/plain")
  })
  test("should create file with type define in options", async () => {
    const file = createFile(path.join(__dirname, "./file.txt"), { type: "application/zip" })
    expect(file.type).toBe("application/zip")
  })
})
