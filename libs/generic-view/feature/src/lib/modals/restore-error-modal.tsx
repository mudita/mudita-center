/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { BackupRestoreError, Modal } from "generic-view/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  cleanRestoreProcess,
  selectActiveApiDeviceId,
  selectBackupRestoreStatus,
  setDeviceErrorModalOpened,
} from "generic-view/store"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

const RestoreErrorModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const activeDevice = useSelector(selectActiveApiDeviceId)
  const restoreStatus = useSelector(selectBackupRestoreStatus)
  const opened = restoreStatus === "FAILED" && !activeDevice

  const onClose = () => {
    dispatch(cleanRestoreProcess())
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
      componentKey={"restore-error-modal"}
    >
      <BackupRestoreError closeAction={{ type: "custom", callback: onClose }} />
    </Modal>
  )
}

export default RestoreErrorModal
