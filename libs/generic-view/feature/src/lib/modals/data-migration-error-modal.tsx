/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect } from "react"
import { Modal, TransferErrorModal } from "generic-view/ui"
import { useDispatch, useSelector } from "react-redux"
import {
  clearDataTransfer,
  DataMigrationPercentageProgress,
  selectActiveApiDeviceId,
  selectDataMigrationStatus,
  setDataMigrationFeatures,
  setDataMigrationProgress,
  setDataMigrationPureDbIndexing,
  setDataMigrationSourceDevice,
  setDataMigrationStatus,
  setDeviceErrorModalOpened,
} from "generic-view/store"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

export const DataMigrationErrorModal: FunctionComponent = () => {
  const dispatch = useDispatch()
  const activeDevice = useSelector(selectActiveApiDeviceId)
  const dataMigrationStatus = useSelector(selectDataMigrationStatus)
  const opened = dataMigrationStatus === "FAILED" && !activeDevice

  const onClose = () => {
    dispatch(setDataMigrationStatus("IDLE"))
    dispatch(setDataMigrationProgress(DataMigrationPercentageProgress.None))
    dispatch(setDataMigrationFeatures([]))
    dispatch(setDataMigrationSourceDevice(undefined))
    dispatch(setDataMigrationPureDbIndexing(false))
    dispatch(setDeviceErrorModalOpened(false))
    dispatch(clearDataTransfer())
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
      componentKey={"data-migration-error-modal"}
    >
      <TransferErrorModal onButtonClick={onClose} />
    </Modal>
  )
}
