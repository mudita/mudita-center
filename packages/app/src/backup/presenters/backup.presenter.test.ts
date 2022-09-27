/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BackupPresenter } from "./backup.presenter"
import fs, { Stats } from "fs"

jest.mock("fs")

describe("Method: toBackup", () => {
  test("returns serialized `Backup` object", () => {
    const dateMock = "2021-08-05T11:50:35.157Z"

    jest.spyOn(fs, "statSync").mockReturnValue({
      mtime: new Date(dateMock),
    } as Stats)

    expect(BackupPresenter.toBackup("backup-1", "/usr/local/backups/")).toEqual(
      {
        filePath: "/usr/local/backups/backup-1",
        date: new Date(dateMock),
      }
    )
  })
})
