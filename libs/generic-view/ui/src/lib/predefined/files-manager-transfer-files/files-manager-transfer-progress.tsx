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
  McFilesManagerTransferProgressConfig,
} from "generic-view/models"
import {
  selectFilesSendingCount,
  selectFilesSendingCurrentFile,
  selectFilesSendingProgress,
  selectFilesTransferMode,
  sendFilesAbort,
} from "generic-view/store"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ProgressBar } from "../../interactive/progress-bar/progress-bar"
import { Modal } from "../../interactive/modal/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { FilesManagerTransferProgressWarning } from "./files-manager-transfer-progress-warning"
import {
  FilesTransferMode,
  SendFilesAction,
} from "../../../../../store/src/lib/file-transfer/files-transfer.type"

const messages = defineMessages({
  progressUploadModalTitle: {
    id: "module.genericViews.filesManager.upload.progress.modalTitle",
  },
  progressExportModalTitle: {
    id: "module.genericViews.filesManager.export.progress.modalTitle",
  },
  cancelButton: {
    id: "module.genericViews.filesManager.file.transfer.progress.cancelButton",
  },
})

export const FilesManagerTransferProgress: APIFC<
  undefined,
  McFilesManagerTransferProgressConfig
> = ({ config }) => {
  const dispatch = useDispatch<Dispatch>()
  const selectorsConfig = { groupId: config.transferActionId }

  const filesCount = useSelector((state: ReduxRootState) => {
    return selectFilesSendingCount(state, selectorsConfig)
  })
  const transferProgress = useSelector((state: ReduxRootState) => {
    return selectFilesSendingProgress(state, selectorsConfig)
  })
  const filesTransferMode = useSelector(selectFilesTransferMode)
  const currentFile = useSelector((state: ReduxRootState) => {
    return selectFilesSendingCurrentFile(state, selectorsConfig)
  })

  const abortAction: ButtonAction = {
    type: "custom",
    callback: () => {
      dispatch(sendFilesAbort(config.transferActionId))
    },
  }

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.SpinnerDark }} />
      <Modal.Title>
        {intl.formatMessage(
          config.actionType === SendFilesAction.ActionExport
            ? messages.progressExportModalTitle
            : messages.progressUploadModalTitle,
          {
            filesCount,
          }
        )}
      </Modal.Title>
      {filesTransferMode === FilesTransferMode.SerialPort && (
        <FilesManagerTransferProgressWarning />
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
