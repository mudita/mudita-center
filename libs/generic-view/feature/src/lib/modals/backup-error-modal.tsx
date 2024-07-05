/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { BackupError, Modal } from "generic-view/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  cleanBackupProcess,
  selectActiveDevice,
  selectBackupProcessStatus,
  setDeviceErrorModalOpened,
} from "generic-view/store"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

const BackupErrorModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const activeDevice = useSelector(selectActiveDevice)
  const backupStatus = useSelector(selectBackupProcessStatus)
  const opened = backupStatus === "FAILED" && !activeDevice

  const onClose = () => {
    dispatch(cleanBackupProcess())
    dispatch(setDeviceErrorModalOpened(false))
  }

  useEffect(() => {
    dispatch(setDeviceErrorModalOpened(opened))
  }, [dispatch, opened])

  return (
    <Modal
      config={{
        defaultOpened: opened,
        size: "small",
        modalLayer: ModalLayers.DisconnectedDeviceError,
      }}
      componentKey={"backup-error-modal"}
    >
      <BackupError closeAction={{ type: "custom", callback: onClose }} />
    </Modal>
  )
}

export default BackupErrorModal
