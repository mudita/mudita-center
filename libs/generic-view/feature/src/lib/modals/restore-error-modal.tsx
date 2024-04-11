/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { BackupRestoreError, Modal } from "generic-view/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  cleanRestoreProcess,
  selectActiveDevice,
  selectBackupRestoreStatus,
} from "generic-view/store"

const RestoreErrorModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const activeDevice = useSelector(selectActiveDevice)
  const restoreStatus = useSelector(selectBackupRestoreStatus)
  const opened = restoreStatus === "FAILED" && !activeDevice

  const onClose = () => {
    dispatch(cleanRestoreProcess())
  }
  return (
    <Modal
      config={{ defaultOpened: opened, size: "small" }}
      componentKey={"restore-error-modal"}
    >
      <BackupRestoreError closeAction={{ type: "custom", callback: onClose }} />
    </Modal>
  )
}

export default RestoreErrorModal
