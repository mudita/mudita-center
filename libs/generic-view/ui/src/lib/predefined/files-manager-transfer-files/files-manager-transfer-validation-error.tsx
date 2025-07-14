/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { APIFC, IconType } from "generic-view/utils"
import {
  ButtonAction,
  McFilesManagerTransferValidationErrorConfig,
  McFilesManagerTransferValidationErrorData,
} from "generic-view/models"
import {
  clearFileTransferErrors,
  selectValidationFailureType,
  ValidationErrorNotHaveSpaceForUpload,
} from "generic-view/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { Modal } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"

const messages = defineMessages({
  title: {
    id: "module.genericViews.filesManager.upload.validationFailure.modalTitle",
  },
  closeButtonLabel: {
    id: "module.genericViews.filesManager.upload.failure.modalCloseButton",
  },
  uploadDuplicateFileDescription: {
    id: "module.genericViews.filesManager.upload.validationFailure.duplicatesDescription",
  },
  uploadInsufficientMemoryDescription: {
    id: "module.genericViews.filesManager.upload.validationFailure.insufficientMemoryDescription",
  },
  uploadFileTooLargeDescription: {
    id: "module.genericViews.filesManager.upload.validationFailure.fileTooLargeDescription",
  },
})

export const FilesManagerTransferValidationError: APIFC<
  McFilesManagerTransferValidationErrorData,
  McFilesManagerTransferValidationErrorConfig
> = ({ config, data }) => {
  const dispatch = useDispatch<Dispatch>()
  const validationFailureType = useSelector((state: ReduxRootState) =>
    selectValidationFailureType(state, config.fileTransferActionId)
  )

  const filesCount = data?.fileList.length || 0

  const closeActions: ButtonAction[] = [
    {
      type: "close-modal",
      modalKey: config.modalKey,
    },
    {
      type: "custom",
      callback: () => {
        dispatch(
          clearFileTransferErrors({ actionId: config.fileTransferActionId })
        )
      },
    },
  ]

  const errorMessage = useMemo(() => {
    if (validationFailureType?.status === "someFileLargerThan2GB") {
      return intl.formatMessage(messages.uploadFileTooLargeDescription, {
        filesCount,
      })
    }
    if (validationFailureType?.status === "allFilesDuplicated") {
      return intl.formatMessage(messages.uploadDuplicateFileDescription, {
        filesCount,
      })
    }
    if (validationFailureType?.status === "notHaveSpaceForUpload") {
      return intl.formatMessage(messages.uploadInsufficientMemoryDescription, {
        value: (validationFailureType as ValidationErrorNotHaveSpaceForUpload)
          .formattedDifference,
        filesCount,
      })
    }
    return ""
  }, [filesCount, validationFailureType])

  return (
    <>
      <Modal.TitleIcon
        config={{
          type: IconType.Failure,
        }}
      />
      <Modal.Title>
        {intl.formatMessage(messages.title, {
          filesCount,
        })}
      </Modal.Title>
      <p>{errorMessage}</p>
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.closeButtonLabel),
            actions: closeActions,
          }}
        />
      </Modal.Buttons>
    </>
  )
}
