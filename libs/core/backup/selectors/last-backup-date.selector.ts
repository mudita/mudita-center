/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { sortBackups } from "Core/backup/helpers/sort-backups"
import { backupStateSelector } from "Core/backup/selectors/backup-state.selector"
import { BackupState } from "Core/backup"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const lastBackupDateSelector = createSelector<
  ReduxRootState,
  BackupState,
  Date | undefined
>(backupStateSelector, (state) => {
  const sortedBackups = sortBackups(state.data.backups)

  return sortedBackups[0]?.date
})
