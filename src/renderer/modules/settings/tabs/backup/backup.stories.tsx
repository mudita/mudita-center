import { storiesOf } from "@storybook/react"
import React from "react"
import BackupUI from "Renderer/modules/settings/tabs/backup/backup-ui.component"

storiesOf("Settings|Backup", module).add("Backup", () => (
  <div style={{ maxWidth: "63rem" }}>
    <BackupUI backupLocation={"C:/MuditaOs/backup"} />
  </div>
))
