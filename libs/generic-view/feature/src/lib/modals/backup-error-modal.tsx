/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { BackupError, ModalBase, ModalCenteredContent } from "generic-view/ui"
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
    <ModalBase opened={opened} size={"small"}>
      <ModalCenteredContent>
        <BackupError closeAction={{ type: "custom", callback: onClose }} />
      </ModalCenteredContent>
    </ModalBase>
  )
}

export default BackupErrorModal
