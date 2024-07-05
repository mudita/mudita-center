/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { ImportContactsError, Modal } from "generic-view/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  cleanImportProcess,
  importStatusSelector,
  selectActiveDevice,
  setDeviceErrorModalOpened,
} from "generic-view/store"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

const ImportContactsErrorModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const activeDevice = useSelector(selectActiveDevice)
  const importStatus = useSelector(importStatusSelector)
  const opened = importStatus === "FAILED" && !activeDevice

  const onClose = () => {
    dispatch(cleanImportProcess())
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
      componentKey={"import-contacts-error-modal"}
    >
      <ImportContactsError
        closeAction={{ type: "custom", callback: onClose }}
      />
    </Modal>
  )
}

export default ImportContactsErrorModal
