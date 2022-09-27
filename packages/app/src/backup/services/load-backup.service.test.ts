/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs, { Dirent, Stats } from "fs"
import { Result } from "App/core/builder"
import { LoadBackupService } from "App/backup/services/load-backup.service"

const subject = new LoadBackupService()

jest.mock("fs")

describe("Method: `loadBackups`", () => {
  describe("When backup directory doesn't exists", () => {
    test("returns `Result.success` with empty list", () => {
      jest.spyOn(fs, "existsSync").mockReturnValue(false)

      expect(subject.loadBackups("/usr/backups/")).toEqual(Result.success([]))
    })
  })

  describe("When backup directory exists", () => {
    test("returns `Result.success` with backup list", () => {
      const dateMock = "2021-08-05T11:50:35.157Z"

      jest.spyOn(fs, "existsSync").mockReturnValue(true)
      jest
        .spyOn(fs, "readdirSync")
        .mockReturnValue(["backup-1", "backup-2"] as unknown as Dirent[])
      jest.spyOn(fs, "statSync").mockReturnValue({
        mtime: new Date(dateMock),
      } as Stats)

      expect(subject.loadBackups("/usr/backups/")).toEqual(
        Result.success([
          {
            filePath: "/usr/backups/backup-1",
            date: new Date(dateMock),
          },
          {
            filePath: "/usr/backups/backup-2",
            date: new Date(dateMock),
          },
        ])
      )
    })
  })
})
