/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dialog, BrowserWindow } from "electron"
import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { FileSystemDialogService } from "./file-system-dialog.service"
import { FileSystemDialogError } from "./error.constant"

jest.mock("electron", () => ({
  dialog: {
    showOpenDialog: jest.fn(),
  },
}))

const subject = new FileSystemDialogService({} as BrowserWindow)

beforeEach(() => [jest.resetAllMocks()])

test("returns `Result.success` with selected files list", async () => {
  ;(dialog.showOpenDialog as jest.Mock).mockResolvedValueOnce({
    filePaths: ["/test/file-1.txt"],
  })

  const result = await subject.getPaths()
  expect(result).toEqual(Result.success(["/test/file-1.txt"]))
})

test("returns `Result.failed` if `showOpenDialog` throw an error", async () => {
  ;(dialog.showOpenDialog as jest.Mock).mockRejectedValueOnce(
    new Error("Luke, I'm your error")
  )

  const result = await subject.getPaths()
  expect(result).toEqual(
    Result.failed(
      new AppError(FileSystemDialogError.GetPath, "Luke, I'm your error")
    )
  )
})
