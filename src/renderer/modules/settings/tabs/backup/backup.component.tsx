import React, { useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import { AppSettings } from "App/main/default-app-settings"
import BackupUI from "Renderer/modules/settings/tabs/backup/backup-ui.component"

const Backup: FunctionComponent = () => {
  const [settings, setSettings] = useState<AppSettings>()
  useEffect(() => {
    ;(async () => {
      setSettings(await getAppSettings())
    })()
  }, [settings])
  return <BackupUI backupLocation={settings?.pureOsBackupLocation} />
}

export default Backup
