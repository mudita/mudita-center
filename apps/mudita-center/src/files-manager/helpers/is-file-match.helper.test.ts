/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isFileMatch } from "App/files-manager/helpers/is-file-match.helper"
import { File } from "App/files-manager/dto"

describe("`isFileMatch` helper", () => {
  test("filter via `name` works properly", () => {
    const file: File = {
      id: "user/music/no_name",
      size: 12345,
      name: "no_name",
      type: "wav",
    }
    expect(isFileMatch(file, "no_name")).toBeTruthy()
  })
  test("filter via `type` works properly", () => {
    const file: File = {
      id: "user/music/no_name",
      size: 12345,
      name: "no_name",
      type: "wav",
    }
    expect(isFileMatch(file, "wav")).toBeTruthy()
  })
  test("filter via `id` isn't handled", () => {
    const file: File = {
      id: "user/music/no_name",
      size: 12345,
      name: "no_name",
      type: "wav",
    }
    expect(isFileMatch(file, file.id)).toBeFalsy()
  })
  test("filter via `size` isn't handled", () => {
    const file: File = {
      id: "user/music/no_name",
      size: 12345,
      name: "no_name",
      type: "wav",
    }
    expect(isFileMatch(file, String(file.size))).toBeFalsy()
  })
  test("returns true when `searchValue` is empty", () => {
    const file: File = {
      id: "user/music/no_name",
      size: 12345,
      name: "no_name",
      type: "wav",
    }
    expect(isFileMatch(file, "")).toBeTruthy()
  })
  test("returns false when `searchValue` isn't match", () => {
    const file: File = {
      id: "user/music/no_name",
      size: 12345,
      name: "no_name",
      type: "wav",
    }
    expect(isFileMatch(file, "no_name2")).toBeFalsy()
  })
})
