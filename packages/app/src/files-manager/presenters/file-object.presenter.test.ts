/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileInput } from "App/files-manager/dto"
import { FileObjectPresenter } from "App/files-manager/presenters/file-object.presenter"

const fileInput: FileInput = {
  path: "/music/test-1.mp3",
  fileSize: 6145498,
}

describe("Method: toFile", () => {
  test("returns serialized file object", () => {
    expect(FileObjectPresenter.toFile(fileInput)).toEqual({
      id: "/music/test-1.mp3",
      name: "test-1.mp3",
      type: "mp3",
      size: 6145498,
    })
  })
})
