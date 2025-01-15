/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC, IconType } from "generic-view/utils"
import {
  ButtonAction,
  McFilesManagerUploadFinishedConfig,
} from "generic-view/models"
import { Modal } from "../../interactive/modal/modal"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import {
  selectFilesSendingCount,
  selectFilesSendingFailed,
  selectFilesSendingSucceeded,
  sendFilesClear,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { modalTransitionDuration } from "generic-view/theme"

const messages = defineMessages({
  failedModalTitle: {
    id: "module.genericViews.filesManager.upload.failure.modalTitle",
  },
})

export const FilesManagerUploadFinished: APIFC<
  undefined,
  McFilesManagerUploadFinishedConfig
> = ({ config }) => {
  const dispatch = useDispatch<Dispatch>()
  const selectorsConfig = { groupId: config.uploadActionId }

  const filesCount = useSelector((state: ReduxRootState) => {
    return selectFilesSendingCount(state, selectorsConfig)
  })
  const sentFiles = useSelector((state: ReduxRootState) => {
    return selectFilesSendingSucceeded(state, selectorsConfig)
  })
  const failedFiles = useSelector((state: ReduxRootState) => {
    return selectFilesSendingFailed(state, selectorsConfig)
  })

  const closeActions: ButtonAction[] = [
    {
      type: "close-modal",
      modalKey: config.modalKey,
    },
    {
      type: "custom",
      callback: () => {
        setTimeout(() => {
          dispatch(sendFilesClear({ groupId: config.uploadActionId }))
        }, modalTransitionDuration)
      },
    },
  ]

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.Success }} />
      <Modal.Title>
        {intl.formatMessage(messages.failedModalTitle, {
          filesCount,
        })}
      </Modal.Title>
      <p>Sent:</p>
      {sentFiles.map((file) => (
        <div key={file.id}>{file.name}</div>
      ))}
      <p>Failed:</p>
      {failedFiles.map((file) => (
        <div key={file.id}>
          {file.name} ({file.error})
        </div>
      ))}
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary config={{ text: "Close", actions: closeActions }} />
      </Modal.Buttons>
    </>
  )
}
