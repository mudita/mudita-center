/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { useDispatch, useSelector } from "react-redux"
import { APIFC, IconType } from "generic-view/utils"
import {
  ButtonAction,
  McFilesManagerUploadProgressConfig,
} from "generic-view/models"
import {
  selectFilesSendingCount,
  selectFilesSendingCurrentFile,
  selectFilesSendingProgress,
  sendFilesAbort,
} from "generic-view/store"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ProgressBar } from "../../interactive/progress-bar/progress-bar"
import { Modal } from "../../interactive/modal/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { FilesManagerUploadProgressWarning } from "./files-manager-upload-progress-warning"
import { FilesTransferMode } from "../../../../../store/src/lib/file-transfer/files-transfer-mode.type"

const messages = defineMessages({
  progressModalTitle: {
    id: "module.genericViews.filesManager.upload.progress.modalTitle",
  },
  cancelButton: {
    id: "module.genericViews.filesManager.upload.progress.cancelButton",
  },
})

export const FilesManagerUploadProgress: APIFC<
  undefined,
  McFilesManagerUploadProgressConfig
> = ({ config }) => {
  const dispatch = useDispatch<Dispatch>()
  const selectorsConfig = { groupId: config.uploadActionId }

  const filesCount = useSelector((state: ReduxRootState) => {
    return selectFilesSendingCount(state, selectorsConfig)
  })
  const transferProgress = useSelector((state: ReduxRootState) => {
    return selectFilesSendingProgress(state, selectorsConfig)
  })
  const filesTransferMode = useSelector((state: ReduxRootState) => {
    return state.genericFileTransfer.filesTransferMode
  })
  const currentFile = useSelector((state: ReduxRootState) => {
    return selectFilesSendingCurrentFile(state, selectorsConfig)
  })

  const abortAction: ButtonAction = {
    type: "custom",
    callback: () => {
      dispatch(sendFilesAbort(config.uploadActionId))
    },
  }

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.SpinnerDark }} />
      <Modal.Title>
        {intl.formatMessage(messages.progressModalTitle, {
          filesCount,
        })}
      </Modal.Title>
      {filesTransferMode === FilesTransferMode.SerialPort && (
        <FilesManagerUploadProgressWarning />
      )}
      <ProgressBar
        config={{
          maxValue: 100,
        }}
        data={{
          value: transferProgress,
          message: currentFile?.name || "",
        }}
      />
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary config={{ actions: [abortAction] }}>
          {intl.formatMessage(messages.cancelButton)}
        </ButtonSecondary>
      </Modal.Buttons>
    </>
  )
}
