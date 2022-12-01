/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { lastBackupDateSelector } from "App/backup/selectors/last-backup-date.selector"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Backup } from "App/backup/dto"
import { backupReducer, initialState } from "App/backup/reducers"

const today = new Date()
const yesterday = new Date(today.setDate(today.getDate() - 1))

const backup1: Backup = {
  filePath: "C:\\backups\\backup-1.text",
  date: yesterday,
}

const backup2: Backup = {
  filePath: "C:\\backups\\backup-1.text",
  date: today,
}

describe("`lastBackupDateSelector` selector", () => {
  test("when initial state is set selector returns undefined", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup: backupReducer(undefined, {} as any),
    } as ReduxRootState
    expect(lastBackupDateSelector(state)).toBeUndefined()
  })

  test("when is visible just single backup selector returns date", () => {
    const state = {
      backup: backupReducer(
        { ...initialState, data: { backups: [backup1] } },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
    } as ReduxRootState
    expect(lastBackupDateSelector(state)).toEqual(backup1.date)
  })

  test("when is set more than one backup selector returns latest date", () => {
    const state = {
      backup: backupReducer(
        { ...initialState, data: { backups: [backup1, backup2] } },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
    } as ReduxRootState
    expect(lastBackupDateSelector(state)).toEqual(backup2.date)
  })
})
