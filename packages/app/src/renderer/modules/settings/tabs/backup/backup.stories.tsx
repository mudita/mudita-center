/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import BackupUI from "Renderer/modules/settings/tabs/backup/backup-ui.component"

storiesOf("Settings/Backup", module).add("Backup", () => (
  <div style={{ maxWidth: "63rem" }}>
    <BackupUI backupLocation={"C:/MuditaOs/backup"} />
  </div>
))
