import React from "react"
import BackupUI from "App/settings/components/backup/backup-ui.component"

export default {
  title: "Settings/Backup",
}

export const Backup = () => (
  <div style={{ maxWidth: "63rem" }}>
    <BackupUI backupLocation={"C:/MuditaOs/backup"} />
  </div>
)
