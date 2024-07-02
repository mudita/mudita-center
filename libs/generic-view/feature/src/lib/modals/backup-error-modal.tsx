/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { BackupError, Modal } from "generic-view/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  cleanBackupProcess,
  selectActiveApiDeviceId,
  selectBackupProcessStatus,
} from "generic-view/store"

const BackupErrorModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)
  const backupStatus = useSelector(selectBackupProcessStatus)
  const opened = backupStatus === "FAILED" && !activeDeviceId

  const onClose = () => {
    dispatch(cleanBackupProcess())
  }
  return (
    <Modal
      config={{ defaultOpened: opened, size: "small" }}
      componentKey={"backup-error-modal"}
    >
      <BackupError closeAction={{ type: "custom", callback: onClose }} />
    </Modal>
  )
}

export default BackupErrorModal
