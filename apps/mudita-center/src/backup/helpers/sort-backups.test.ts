/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Backup } from "App/backup/dto"
import { sortBackups } from "App/backup/helpers/sort-backups"

const firstBackup: Backup = {
  filePath: "/usr/files/backup-1",
  date: new Date("2016-08-25T11:00:00.000Z"),
}

const secondBackup: Backup = {
  filePath: "/usr/files/backup-2",
  date: new Date("2018-08-25T11:00:00.000Z"),
}

const unsortedList: Backup[] = [firstBackup, secondBackup]

test("Returns sorted by date backups list", () => {
  expect(sortBackups(unsortedList)).toEqual([secondBackup, firstBackup])
})
