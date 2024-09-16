/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { GenericThemeProvider } from "generic-view/theme"
import BackupErrorModal from "./modals/backup-error-modal"
import RestoreErrorModal from "./modals/restore-error-modal"
import ImportContactsErrorModal from "./modals/import-contacts-error-modal"
import { DataMigrationErrorModal } from "./modals/data-migration-error-modal"

export const ApiDeviceModals: FunctionComponent = () => {
  return (
    <GenericThemeProvider>
      <BackupErrorModal />
      <RestoreErrorModal />
      <ImportContactsErrorModal />
      <DataMigrationErrorModal />
    </GenericThemeProvider>
  )
}
