/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  BackupFailureModal,
  BackupModal,
  BackupSpinnerModal,
  BackupSuccessModal,
} from "App/overview/components/backup-modal-dialogs/backup-modal-dialogs"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { BackupDeviceFlowTestIds } from "App/overview/components/backup-device-flow/backup-device-flow-test-ids.component"

export enum BackupDeviceFlowState {
  Start = "start",
  Running = "running",
  Finished = "finished",
  Error = "error",
}

interface Props extends Omit<ComponentProps<typeof ModalDialog>, "open"> {
  openState?: BackupDeviceFlowState
  pureOsBackupLocation: string
  onStartBackupDeviceButtonClick: () => void
  onSupportButtonClick: () => void
}

const BackupDeviceFlow: FunctionComponent<Props> = ({
  openState = BackupDeviceFlowState.Start,
  pureOsBackupLocation,
  onStartBackupDeviceButtonClick,
  onSupportButtonClick,
  closeModal,
}) => {
  return (
    <>
      <BackupModal
        testId={BackupDeviceFlowTestIds.BackupDeviceStart}
        open={BackupDeviceFlowState.Start === openState}
        closeModal={closeModal}
        onActionButtonClick={onStartBackupDeviceButtonClick}
      />
      <BackupSpinnerModal
        testId={BackupDeviceFlowTestIds.BackupDeviceRunning}
        open={BackupDeviceFlowState.Running === openState}
      />
      <BackupSuccessModal
        testId={BackupDeviceFlowTestIds.BackupDeviceFinished}
        open={BackupDeviceFlowState.Finished === openState}
        description={pureOsBackupLocation}
        closeModal={closeModal}
        onActionButtonClick={closeModal}
      />
      <BackupFailureModal
        testId={BackupDeviceFlowTestIds.BackupDeviceError}
        open={BackupDeviceFlowState.Error === openState}
        secondaryActionButtonClick={onSupportButtonClick}
        closeModal={closeModal}
      />
    </>
  )
}

export default BackupDeviceFlow
