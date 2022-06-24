/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import BackupUI from "App/__deprecated__/renderer/modules/settings/tabs/backup/backup-ui.component"
import { AppSettings } from "App/__deprecated__/main/store/settings.interface"
import useLocationPicker from "App/__deprecated__/renderer/utils/hooks/use-location-picker"

export interface BackupProps {
  setPureOsBackupLocation: (value: AppSettings["pureOsBackupLocation"]) => void
}

const Backup: FunctionComponent<BackupProps & AppSettings> = ({
  setPureOsBackupLocation,
  pureOsBackupLocation,
}) => {
  const openDialog = async () => {
    const location = await useLocationPicker(pureOsBackupLocation)
    if (location) {
      await setPureOsBackupLocation(location)
    }
  }

  return (
    <BackupUI backupLocation={pureOsBackupLocation} openDialog={openDialog} />
  )
}

export default Backup
