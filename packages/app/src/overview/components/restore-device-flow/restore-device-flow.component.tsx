/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  RestoreFailureModal,
  RestoreModal,
  RestoreSpinnerModal,
  RestoreSuccessModal,
} from "App/overview/components/restore-modal-dialogs/restore-modal-dialogs"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { RestoreDeviceFlowTestIds } from "App/overview/components/restore-device-flow/restore-device-flow-test-ids.component"
import { Backup } from "App/backup/reducers"

export enum RestoreDeviceFlowState {
  Start = "start",
  Running = "running",
  Finished = "finished",
  Error = "error",
}

interface Props extends Omit<ComponentProps<typeof ModalDialog>, "open"> {
  openState?: RestoreDeviceFlowState
  backups: Backup[]
  onStartRestoreDeviceButtonClick: (backup: Backup) => void
  onSupportButtonClick: () => void
}

const RestoreDeviceFlow: FunctionComponent<Props> = ({
  openState = RestoreDeviceFlowState.Start,
  backups,
  onStartRestoreDeviceButtonClick,
  onSupportButtonClick,
  closeModal,
}) => {
  const lastBackup = backups[backups.length - 1]

  const handleActionButtonClick = (): void => {
    onStartRestoreDeviceButtonClick(lastBackup)
  }
  return (
    <>
      <RestoreModal
        testId={RestoreDeviceFlowTestIds.RestoreDeviceStart}
        open={RestoreDeviceFlowState.Start === openState}
        closeModal={closeModal}
        onActionButtonClick={handleActionButtonClick}
        backupDate={lastBackup.date}
      />
      <RestoreSpinnerModal
        testId={RestoreDeviceFlowTestIds.RestoreDeviceRunning}
        open={RestoreDeviceFlowState.Running === openState}
      />
      <RestoreSuccessModal
        testId={RestoreDeviceFlowTestIds.RestoreDeviceFinished}
        open={RestoreDeviceFlowState.Finished === openState}
        closeModal={closeModal}
        onActionButtonClick={closeModal}
      />
      <RestoreFailureModal
        testId={RestoreDeviceFlowTestIds.RestoreDeviceError}
        open={RestoreDeviceFlowState.Error === openState}
        secondaryActionButtonClick={onSupportButtonClick}
        closeModal={closeModal}
      />
    </>
  )
}

export default RestoreDeviceFlow
