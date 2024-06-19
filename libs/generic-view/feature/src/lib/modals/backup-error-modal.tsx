/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { BackupError, Modal } from "generic-view/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  cleanBackupProcess,
  selectActiveDevice,
  selectBackupProcessStatus,
} from "generic-view/store"

const BackupErrorModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const activeDevice = useSelector(selectActiveDevice)
  const backupStatus = useSelector(selectBackupProcessStatus)
  const opened = backupStatus === "FAILED" && !activeDevice

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
