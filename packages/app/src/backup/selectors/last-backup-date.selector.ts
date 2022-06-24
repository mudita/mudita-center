/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { sortBackups } from "App/backup/helpers/sort-backups"

const backupsSelector = ({ backup }: ReduxRootState) => backup.backups

export const lastBackupDateSelector = createSelector(
  backupsSelector,
  (backups) => {
    const sortedBackups = sortBackups(backups)

    return sortedBackups[0]?.date
  }
)
