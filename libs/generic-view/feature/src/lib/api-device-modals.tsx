/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { GenericThemeProvider } from "generic-view/theme"
import {
  BackupError,
  BackupRestoreError,
  ModalBase,
  ModalCenteredContent,
} from "generic-view/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  cleanBackupProcess,
  cleanRestoreProcess,
  selectActiveDevice,
  selectBackupProcessStatus,
  selectBackupRestoreStatus,
} from "generic-view/store"

export const ApiDeviceModals: FunctionComponent = () => {
  return (
    <GenericThemeProvider>
      <BackupErrorModal />
      <RestoreErrorModal />
    </GenericThemeProvider>
  )
}

const BackupErrorModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const activeDevice = useSelector(selectActiveDevice)
  const backupStatus = useSelector(selectBackupProcessStatus)
  const opened = backupStatus === "FAILED" && !activeDevice

  const onClose = () => {
    dispatch(cleanBackupProcess())
  }
  return (
    <ModalBase opened={opened} variant={"small"}>
      <ModalCenteredContent>
        <BackupError closeAction={{ type: "custom", callback: onClose }} />
      </ModalCenteredContent>
    </ModalBase>
  )
}

const RestoreErrorModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const activeDevice = useSelector(selectActiveDevice)
  const restoreStatus = useSelector(selectBackupRestoreStatus)
  const opened = restoreStatus === "FAILED" && !activeDevice

  const onClose = () => {
    dispatch(cleanRestoreProcess())
  }
  return (
    <ModalBase opened={opened} variant={"small"}>
      <ModalCenteredContent>
        <BackupRestoreError
          closeAction={{ type: "custom", callback: onClose }}
        />
      </ModalCenteredContent>
    </ModalBase>
  )
}
