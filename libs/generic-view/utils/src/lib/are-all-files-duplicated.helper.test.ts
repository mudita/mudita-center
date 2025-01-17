/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { areAllFilesDuplicated } from "./are-all-files-duplicated.helper"

describe("areAllFilesDuplicated", () => {
  it("returns true when all file names in filesToCheck exist in referenceFiles", () => {
    const filesToCheck = ["file1.txt", "file2.txt", "file3.txt"]
    const referenceFiles = ["file3.txt", "file2.txt", "file1.txt"]

    const result = areAllFilesDuplicated(filesToCheck, referenceFiles)

    expect(result).toBe(true)
  })

  it("returns false when not all file names in filesToCheck exist in referenceFiles", () => {
    const filesToCheck = ["file1.txt", "file2.txt", "file4.txt"]
    const referenceFiles = ["file3.txt", "file2.txt", "file1.txt"]

    const result = areAllFilesDuplicated(filesToCheck, referenceFiles)

    expect(result).toBe(false)
  })

  it("returns true when both filesToCheck and referenceFiles are empty", () => {
    const filesToCheck: string[] = []
    const referenceFiles: string[] = []

    const result = areAllFilesDuplicated(filesToCheck, referenceFiles)

    expect(result).toBe(true)
  })

  it("returns false when filesToCheck is not empty and referenceFiles is empty", () => {
    const filesToCheck = ["file1.txt"]
    const referenceFiles: string[] = []

    const result = areAllFilesDuplicated(filesToCheck, referenceFiles)

    expect(result).toBe(false)
  })

  it("returns true when all file names are identical even with different paths", () => {
    const filesToCheck = ["file1.txt", "file2.txt"]
    const referenceFiles = ["/path/to/file1.txt", "/another/path/file2.txt"]

    const result = areAllFilesDuplicated(filesToCheck, referenceFiles)

    expect(result).toBe(true)
  })

  it("returns false when case sensitivity matters and names differ in case", () => {
    const filesToCheck = ["file1.TXT", "file2.txt"]
    const referenceFiles = ["file1.txt", "file2.txt"]

    const result = areAllFilesDuplicated(filesToCheck, referenceFiles)

    expect(result).toBe(false)
  })

  it("returns false when filesToCheck contains duplicates but referenceFiles does not", () => {
    const filesToCheck = ["file1.txt", "file1.txt", "file2.txt"]
    const referenceFiles = ["file1.txt", "file2.txt"]

    const result = areAllFilesDuplicated(filesToCheck, referenceFiles)

    expect(result).toBe(true)
  })

  it("returns true when all file names match with complex paths", () => {
    const filesToCheck = ["file1.txt", "file2.txt"]
    const referenceFiles = [
      "/path/to/file1.txt",
      "/another/directory/file2.txt",
      "/extra/path/file3.txt",
    ]

    const result = areAllFilesDuplicated(filesToCheck, referenceFiles)

    expect(result).toBe(true)
  })

  it("returns false when at least one file name in filesToCheck is missing in referenceFiles with paths", () => {
    const filesToCheck = ["file1.txt", "file4.txt"] // file4.txt is missing
    const referenceFiles = [
      "/path/to/file1.txt",
      "/another/directory/file2.txt",
      "/extra/path/file3.txt",
    ]

    const result = areAllFilesDuplicated(filesToCheck, referenceFiles)

    expect(result).toBe(false)
  })
})
