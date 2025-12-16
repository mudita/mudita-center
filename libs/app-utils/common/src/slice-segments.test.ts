/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { sliceSegments } from "./slice-segments"

describe("sliceSegments", () => {
  test("returns last segment for negative start index", () => {
    const path =
      "/Users/mudita/Library/Application Support/mudita-center/msc-harmony/BellHybrid.img"

    const result = sliceSegments(path, -1)

    expect(result).toBe("BellHybrid.img")
  })

  test("returns directory path without last segment when end is -1", () => {
    const path =
      "/Users/mudita/Library/Application Support/mudita-center/msc-harmony/BellHybrid.img"

    const result = sliceSegments(path, 0, -1)

    expect(result).toBe(
      "/Users/mudita/Library/Application Support/mudita-center/msc-harmony"
    )
  })

  test("ignores leading and trailing slashes", () => {
    const path = "/a/b/c/"

    const result = sliceSegments(path)

    expect(result).toBe("a/b/c")
  })

  test("normalizes multiple consecutive slashes", () => {
    const path = "///a//b/c"

    const result = sliceSegments(path)

    expect(result).toBe("a/b/c")
  })

  test("returns middle part of the path for positive start", () => {
    const path = "root/dir/subdir/file.txt"

    const result = sliceSegments(path, 1)

    expect(result).toBe("dir/subdir/file.txt")
  })

  test("returns empty string for empty path", () => {
    const result = sliceSegments("")

    expect(result).toBe("")
  })

  test("handles Windows-style path with backslashes", () => {
    const path =
      "C:\\Users\\MUDITA\\AppData\\Roaming\\mudita-center\\msc-harmony\\BellHybrid-2.5.0-RT1051-image.tar"

    const result = sliceSegments(path, 0, -1)

    expect(result).toBe(
      "C:\\Users\\MUDITA\\AppData\\Roaming\\mudita-center\\msc-harmony"
    )
  })
})
