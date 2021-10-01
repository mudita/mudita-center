/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "reselect"
import { ReduxRootState } from "Renderer/store"

const backupsSelector = ({ backup }: ReduxRootState) => backup.backups

export const lastBackupDateSelector = createSelector(
  backupsSelector,
  (backups) => {
    const sortedBackups = [...backups].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateA - dateB
    })

    return sortedBackups[backups.length - 1]?.date
  }
)
