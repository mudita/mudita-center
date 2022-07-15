/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import BackupUI from "App/settings/components/backup/backup-ui.component"
import useLocationPicker from "App/__deprecated__/renderer/utils/hooks/use-location-picker"

export interface BackupProps {
  setOsBackupLocation: (value: string) => void
  osBackupLocation: string
}

export const Backup: FunctionComponent<BackupProps> = ({
  setOsBackupLocation,
  osBackupLocation,
}) => {
  const openDialog = async () => {
    const location = await useLocationPicker(osBackupLocation)
    if (location) {
      await setOsBackupLocation(location)
    }
  }

  return <BackupUI backupLocation={osBackupLocation} openDialog={openDialog} />
}
