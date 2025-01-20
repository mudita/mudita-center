/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatBytes } from "./format-bytes"

describe("formatBytes", () => {
  it('should format bytes to "B" correctly', () => {
    expect(formatBytes(0)).toBe("0 B")
    expect(formatBytes(512)).toBe("512 B")
  })

  it('should format bytes to "KB" correctly', () => {
    expect(formatBytes(1024)).toBe("1 KB")
    expect(formatBytes(2048)).toBe("2 KB")
    expect(formatBytes(999 * 1000)).toBe("999 KB")
    expect(formatBytes(1536)).toBe("1.5 KB")
  })

  it('should format bytes to "MB" correctly', () => {
    expect(formatBytes(1024 * 1000)).toBe("1 MB")
    expect(formatBytes(1536000)).toBe("1.5 MB")
    expect(formatBytes(999 * 1000 * 1000)).toBe("999 MB")
    expect(formatBytes(2000000)).toBe("2 MB")
  })

  it('should format bytes to "GB" correctly', () => {
    expect(formatBytes(1000 * 1000 * 1000)).toBe("1 GB")
    expect(formatBytes(1500000000)).toBe("1.5 GB")
    expect(formatBytes(2000000000)).toBe("2 GB")
  })

  it('should format bytes to "TB" correctly', () => {
    expect(formatBytes(1000 * 1000 * 1000 * 1000)).toBe("1 TB")
    expect(formatBytes(1500000000000)).toBe("1.5 TB")
    expect(formatBytes(2000000000000)).toBe("2 TB")
  })

  it("should return a warning and the original value as a string for invalid sizes", () => {
    console.warn = jest.fn()
    expect(formatBytes(-1)).toBe("-1")
    expect(console.warn).toHaveBeenCalledWith("Invalid size")

    expect(formatBytes(NaN)).toBe("NaN")
    expect(console.warn).toHaveBeenCalledWith("Invalid size")
  })

  it("should respect the minimum unit for formatting", () => {
    expect(formatBytes(0, { minUnit: "MB" })).toBe("0 MB")
    expect(formatBytes(1, { minUnit: "MB" })).toBe("0 MB")
    expect(formatBytes(1, { minUnit: "KB" })).toBe("0 KB")
    expect(formatBytes(1000000, { minUnit: "MB" })).toBe("1 MB")
    expect(formatBytes(1000000000, { minUnit: "GB" })).toBe("1 GB")
  })
})
