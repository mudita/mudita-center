/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { APIFC, CustomModalError, IconType } from "generic-view/utils"
import { ButtonAction } from "generic-view/models"
import { McFilesManagerUploadValidationErrorConfig } from "generic-view/models"
import {
  selectValidationFailureType,
  setValidationFailure,
} from "generic-view/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { Modal } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"

const messages = defineMessages({
  title: {
    id: "module.genericViews.filesManager.upload.failure.title",
  },
  defaultErrorMessage: {
    id: "module.genericViews.filesManager.upload.failure.defaultErrorMessage",
  },
  closeButtonLabel: {
    id: "module.genericViews.filesManager.upload.failure.closeButtonLabel",
  },
  uploadDuplicateFileTitle: {
    id: "module.genericViews.filesManager.uploadDuplicateFile.title",
  },
  uploadDuplicateFileDescription: {
    id: "module.genericViews.filesManager.uploadDuplicateFile.description",
  },
  uploadInsufficientMemoryTitle: {
    id: "module.genericViews.filesManager.uploadInsufficientMemory.title",
  },
  uploadInsufficientMemoryDescription: {
    id: "module.genericViews.filesManager.uploadInsufficientMemory.description",
  },
  uploadFileTooLargeTitle: {
    id: "module.genericViews.filesManager.uploadFileTooLarge.title",
  },
  uploadFileTooLargeDescription: {
    id: "module.genericViews.filesManager.uploadFileTooLarge.description",
  },
})

export const FilesManagerUploadValidationError: APIFC<
  undefined,
  McFilesManagerUploadValidationErrorConfig
> = ({ config }) => {
  const dispatch = useDispatch<Dispatch>()
  const [error, setError] = useState<CustomModalError>()
  const validationFailureType = useSelector(selectValidationFailureType)

  const closeActions: ButtonAction[] = [
    {
      type: "close-modal",
      modalKey: config.modalKey,
    },
    {
      type: "custom",
      callback: () => {
        dispatch(setValidationFailure(undefined))
      },
    },
  ]

  useEffect(() => {
    if (validationFailureType?.status === "fileLargerThan2GB") {
      setError({
        title: intl.formatMessage(messages.uploadFileTooLargeTitle),
        message: intl.formatMessage(messages.uploadFileTooLargeDescription),
      })
    }
    if (validationFailureType?.status === "allFilesDuplicated") {
      setError({
        title: intl.formatMessage(messages.uploadDuplicateFileTitle),
        message: intl.formatMessage(messages.uploadDuplicateFileDescription),
      })
    }
    if (validationFailureType?.status === "notHaveSpaceForUpload") {
      setError({
        title: intl.formatMessage(messages.uploadInsufficientMemoryTitle),
        message: intl.formatMessage(
          messages.uploadInsufficientMemoryDescription,
          { value: validationFailureType.formattedDifference }
        ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationFailureType?.status])

  return (
    <>
      <Modal.TitleIcon
        config={{
          type: IconType.Failure,
        }}
      />
      <Modal.Title>
        {error?.title || intl.formatMessage(messages.title)}
      </Modal.Title>
      <p>
        {error?.message || intl.formatMessage(messages.defaultErrorMessage)}
      </p>
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
