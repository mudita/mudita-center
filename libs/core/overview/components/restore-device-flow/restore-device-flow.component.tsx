/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useEffect, useState } from "react"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import {
  InvalidBackupPasswordModal,
  RestoreFailureModal,
  RestoreModal,
  RestoreSpinnerModal,
  RestoreSuccessModal,
} from "Core/overview/components/restore-modal-dialogs/restore-modal-dialogs"
import { ModalDialog } from "Core/ui/components/modal-dialog"
import { RestoreDeviceFlowTestIds } from "Core/overview/components/restore-device-flow/restore-device-flow-test-ids.component"
import { Backup, RestoreBackup } from "Core/backup/dto"
import RestoreAvailableBackupModal from "Core/overview/components/restore-modal-dialogs/restore-available-backup-modal"
import { RestoreConfirmSecretKeyModal } from "Core/overview/components/restore-confirm-secret-key-modal-dialog/restore-confirm-secret-key-modal-dialog.component"
import { AppError } from "Core/core/errors"
import { BackupError } from "Core/backup"

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
  onStartRestoreDeviceButtonClick: (option: RestoreBackup) => void
  onSupportButtonClick: () => void
  error: AppError<BackupError> | null
}

const RestoreDeviceFlow: FunctionComponent<Props> = ({
  openState = RestoreDeviceFlowState.Start,
  backups,
  onStartRestoreDeviceButtonClick,
  onSupportButtonClick,
  closeModal,
  error,
}) => {
  const [state, setState] = useState<RestoreDeviceFlowState>()
  const [activeBackup, setActiveBackup] = useState<Backup>()
  const [forceFormReset, setForceFormReset] = useState<boolean>(false)

  useEffect(() => {
    if (state !== RestoreDeviceFlowState.SecretKeySetting) {
      setState(openState)
    }
  }, [state, openState])

  const onResetCompleted = () => {
    setForceFormReset(false)
  }

  const goToRestoreConfirmSecretKeyModal = (): void => {
    setState(RestoreDeviceFlowState.SecretKeySetting)
  }

  const tryAgainAfterInvalidPassword = (): void => {
    setForceFormReset(true)
    setState(RestoreDeviceFlowState.SecretKeySetting)
  }

  const handleBackupRowClick = (backup: Backup) => {
    setActiveBackup(backup)
  }

  const startRestoreDeviceButtonClick = (key = ""): void => {
    if (activeBackup) {
      setState(RestoreDeviceFlowState.Running)
      onStartRestoreDeviceButtonClick({ backup: activeBackup, key })
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
        onSecretKeySet={startRestoreDeviceButtonClick}
        closeModal={closeModal}
        forceFormReset={forceFormReset}
        onResetCompleted={onResetCompleted}
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
        open={
          RestoreDeviceFlowState.Error === state &&
          error?.type !== BackupError.InvalidToken
        }
        secondaryActionButtonClick={onSupportButtonClick}
        closeModal={closeModal}
      />
      <InvalidBackupPasswordModal
        testId={RestoreDeviceFlowTestIds.RestoreDeviceInvalidPasswordError}
        open={
          RestoreDeviceFlowState.Error === state &&
          error?.type === BackupError.InvalidToken
        }
        onTryAgain={tryAgainAfterInvalidPassword}
        closeModal={closeModal}
      />
    </>
  )
}

export default RestoreDeviceFlow
