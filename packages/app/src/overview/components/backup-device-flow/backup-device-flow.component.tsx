/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useEffect, useState } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  BackupFailureModal,
  BackupModal,
  BackupSpinnerModal,
  BackupSuccessModal,
} from "App/overview/components/backup-modal-dialogs/backup-modal-dialogs"
import ModalDialog from "App/__deprecated__/renderer/components/core/modal-dialog/modal-dialog.component"
import { BackupDeviceFlowTestIds } from "App/overview/components/backup-device-flow/backup-device-flow-test-ids.component"
import { BackupSetSecretKeyModal } from "App/overview/components/backup-set-secret-key-modal-dialog/backup-set-secret-key-modal-dialog.component"

export enum BackupDeviceFlowState {
  Start = "start",
  SecretKeySetting = "secret-key-setting",
  Running = "running",
  Finished = "finished",
  Error = "error",
}

interface Props extends Omit<ComponentProps<typeof ModalDialog>, "open"> {
  openState?: BackupDeviceFlowState
  pureOsBackupLocation: string
  onStartBackupDeviceButtonClick: (secretKey: string) => void
  onSupportButtonClick: () => void
}

const BackupDeviceFlow: FunctionComponent<Props> = ({
  openState = BackupDeviceFlowState.Start,
  pureOsBackupLocation,
  onStartBackupDeviceButtonClick,
  onSupportButtonClick,
  closeModal,
}) => {
  const [state, setState] = useState<BackupDeviceFlowState>(openState)
  const goToBackupSecretKeySettingModal = (): void => {
    setState(BackupDeviceFlowState.SecretKeySetting)
  }

  const startBackupDeviceButtonClick = (secretKey = ""): void => {
    onStartBackupDeviceButtonClick(secretKey)
  }

  useEffect(() => {
    setState(openState)
  }, [openState])

  return (
    <>
      <BackupModal
        testId={BackupDeviceFlowTestIds.BackupDeviceStart}
        open={BackupDeviceFlowState.Start === state}
        closeModal={closeModal}
        onActionButtonClick={goToBackupSecretKeySettingModal}
      />
      <BackupSetSecretKeyModal
        testId={BackupDeviceFlowTestIds.BackupSecretKeySetting}
        open={BackupDeviceFlowState.SecretKeySetting === state}
        closeModal={closeModal}
        onSecretKeySet={startBackupDeviceButtonClick}
      />
      <BackupSpinnerModal
        testId={BackupDeviceFlowTestIds.BackupDeviceRunning}
        open={BackupDeviceFlowState.Running === state}
      />
      <BackupSuccessModal
        testId={BackupDeviceFlowTestIds.BackupDeviceFinished}
        open={BackupDeviceFlowState.Finished === state}
        description={pureOsBackupLocation}
        closeModal={closeModal}
        onActionButtonClick={closeModal}
      />
      <BackupFailureModal
        testId={BackupDeviceFlowTestIds.BackupDeviceError}
        open={BackupDeviceFlowState.Error === state}
        secondaryActionButtonClick={onSupportButtonClick}
        closeModal={closeModal}
      />
    </>
  )
}

export default BackupDeviceFlow
