import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import BackupUI from "Renderer/modules/settings/tabs/backup/backup-ui.component"
import { AppSettings } from "App/main/store/settings.interface"
import useLocationPicker from "Renderer/utils/hooks/use-location-picker"

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
