/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { openFileRequest } from "system-utils/feature"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import BackupUI from "Core/settings/components/backup/backup-ui.component"

export interface BackupProps {
  setOsBackupLocation: (value: string) => void
  osBackupLocation: string
}

export const Backup: FunctionComponent<BackupProps> = ({
  setOsBackupLocation,
  osBackupLocation,
}) => {
  const openDialog = async () => {
    const openFileResult = await openFileRequest({
      properties: ["openDirectory"],
      defaultPath: osBackupLocation,
    })

    const location = openFileResult.ok && openFileResult.data[0]

    if (location) {
      setOsBackupLocation(location)
    }
  }

  return <BackupUI backupLocation={osBackupLocation} openDialog={openDialog} />
}
