/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { dialog } from "electron"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { FilesSystemDialogService } from "App/file-system/services/file-system-dialog.service"
import { DialogFileSystemError } from "App/file-system/constants"

jest.mock("electron", () => ({
  dialog: {
    showOpenDialog: jest.fn(),
  },
}))

const subject = new FilesSystemDialogService()

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
      new AppError(DialogFileSystemError.GetPath, "Luke, I'm your error")
    )
  )
})
