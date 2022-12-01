/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import createFile from "App/__deprecated__/renderer/utils/create-file/create-file"

describe("Create File util", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("should return value of File type", async () => {
    const file = createFile(path.join(__dirname, "./file.txt"))
    expect(file instanceof File).toBe(true)
  })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("should create file with default type property", async () => {
    const file = createFile(path.join(__dirname, "./file.txt"))
    expect(file.type).toBe("text/plain")
  })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("should create file with type define in options", async () => {
    const file = createFile(path.join(__dirname, "./file.txt"), {
      type: "application/zip",
    })
    expect(file.type).toBe("application/zip")
  })
})
