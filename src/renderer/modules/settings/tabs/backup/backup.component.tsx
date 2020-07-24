import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import BackupUI from "Renderer/modules/settings/tabs/backup/backup-ui.component"
import { AppSettings } from "App/main/default-app-settings"
import { LocationPath } from "Renderer/modules/settings/tabs/backup/location-path.enum"
import useLocationPicker from "Renderer/utils/hooks/use-location-picker"

interface Props {
  setPureOsBackupLocation: (value: AppSettings["pureOsBackupLocation"]) => void
}

const Backup: FunctionComponent<Props & AppSettings> = ({
  setPureOsBackupLocation,
  pureOsBackupLocation,
}) => {
  const openDialog = useLocationPicker(
    LocationPath.PureOsBackup,
    setPureOsBackupLocation
  )

  return (
    <BackupUI backupLocation={pureOsBackupLocation} openDialog={openDialog} />
  )
}

export default Backup
