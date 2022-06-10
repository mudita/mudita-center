/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useEffect, useState } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  RestoreFailureModal,
  RestoreModal,
  RestoreSpinnerModal,
  RestoreSuccessModal,
} from "App/overview/components/restore-modal-dialogs/restore-modal-dialogs"
import ModalDialog from "App/__deprecated__/renderer/components/core/modal-dialog/modal-dialog.component"
import { RestoreDeviceFlowTestIds } from "App/overview/components/restore-device-flow/restore-device-flow-test-ids.component"
import { Backup } from "App/backup/reducers"
import RestoreAvailableBackupModal from "App/overview/components/restore-modal-dialogs/restore-available-backup-modal"
import { RestoreConfirmSecretKeyModal } from "App/overview/components/restore-confirm-secret-key-modal-dialog/restore-confirm-secret-key-modal-dialog.component"
import { StartRestoreOption } from "App/restore-device/actions"

export enum RestoreDeviceFlowState {
  Start = "start",
  SecretKeySetting = "secret-key-setting",
  Running = "running",
  Finished = "finished",
  Error = "error",
}

interface Props extends Omit<ComponentProps<typeof ModalDialog>, "open"> {
  openState?: RestoreDeviceFlowState
  backups: Backup[]
  onStartRestoreDeviceButtonClick: (option: StartRestoreOption) => void
  onSupportButtonClick: () => void
}

const RestoreDeviceFlow: FunctionComponent<Props> = ({
  openState = RestoreDeviceFlowState.Start,
  backups,
  onStartRestoreDeviceButtonClick,
  onSupportButtonClick,
  closeModal,
}) => {
  const [state, setState] = useState<RestoreDeviceFlowState>(openState)
  const [activeBackup, setActiveBackup] = useState<Backup>()

  const goToRestoreConfirmSecretKeyModal = (): void => {
    setState(RestoreDeviceFlowState.SecretKeySetting)
  }

  const handleBackupRowClick = (backup: Backup) => {
    setActiveBackup(backup)
  }

  const startBackupDeviceButtonClick = (secretKey = ""): void => {
    if (activeBackup) {
      onStartRestoreDeviceButtonClick({ backup: activeBackup, secretKey })
    }
  }

  useEffect(() => {
    setState(openState)
  }, [openState])

  return (
    <>
      {activeBackup === undefined ? (
        <RestoreAvailableBackupModal
          testId={RestoreDeviceFlowTestIds.RestoreAvailableBackupModal}
          open={RestoreDeviceFlowState.Start === state}
          backups={backups}
          closeModal={closeModal}
          onBackupRowClick={handleBackupRowClick}
        />
      ) : (
        <RestoreModal
          testId={RestoreDeviceFlowTestIds.RestoreDeviceStart}
          open={RestoreDeviceFlowState.Start === state}
          closeModal={closeModal}
          onActionButtonClick={goToRestoreConfirmSecretKeyModal}
          backupDate={activeBackup.date}
        />
      )}
      <RestoreConfirmSecretKeyModal
        testId={RestoreDeviceFlowTestIds.RestoreSecretKeySetting}
        open={RestoreDeviceFlowState.SecretKeySetting === state}
        onSecretKeySet={startBackupDeviceButtonClick}
        closeModal={closeModal}
      />
      <RestoreSpinnerModal
        testId={RestoreDeviceFlowTestIds.RestoreDeviceRunning}
        open={RestoreDeviceFlowState.Running === state}
      />
      <RestoreSuccessModal
        testId={RestoreDeviceFlowTestIds.RestoreDeviceFinished}
        open={RestoreDeviceFlowState.Finished === state}
        closeModal={closeModal}
        onActionButtonClick={closeModal}
      />
      <RestoreFailureModal
        testId={RestoreDeviceFlowTestIds.RestoreDeviceError}
        open={RestoreDeviceFlowState.Error === state}
        secondaryActionButtonClick={onSupportButtonClick}
        closeModal={closeModal}
      />
    </>
  )
}

export default RestoreDeviceFlow
