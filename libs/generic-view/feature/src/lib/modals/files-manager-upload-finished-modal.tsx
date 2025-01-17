/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { FilesManagerUploadFinished, Modal } from "generic-view/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  cleanRestoreProcess,
  clearFileTransferErrors,
  selectActiveApiDeviceId,
  selectFilesSendingFailed,
  sendFilesClear,
  setDeviceErrorModalOpened,
} from "generic-view/store"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import { ButtonAction } from "generic-view/models"
import { modalTransitionDuration } from "generic-view/theme"

const FilesManagerUploadFinishedModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const activeDevice = useSelector(selectActiveApiDeviceId)
  const filesSendingFailed = useSelector(selectFilesSendingFailed)
  console.log(
    "FilesManagerUploadFinishedModal FilesManagerUploadFinishedModal FilesManagerUploadFinishedModal FilesManagerUploadFinishedModal FilesManagerUploadFinishedModal FilesManagerUploadFinishedModal"
  )
  console.log(filesSendingFailed)
  console.log(activeDevice)
  const opened = filesSendingFailed.length > 0 && !activeDevice

  const onClose = () => {
    dispatch(cleanRestoreProcess())
    dispatch(setDeviceErrorModalOpened(false))
  }

  useEffect(() => {
    dispatch(setDeviceErrorModalOpened(opened))
  }, [dispatch, opened])

  const closeActions: ButtonAction[] = [
    {
      type: "custom",
      callback: () => {
        setTimeout(() => {
          dispatch(sendFilesClear())
          dispatch(clearFileTransferErrors())
        }, modalTransitionDuration)
      },
    },
  ]

  return (
    <Modal
      config={{
        defaultOpened: opened,
        size: "small",
        modalLayer: ModalLayers.DisconnectedDeviceError,
      }}
      componentKey={"files-manager-upload-error-modal"}
    >
      <FilesManagerUploadFinished config={{ actions: closeActions }} />
    </Modal>
  )
}

export default FilesManagerUploadFinishedModal
