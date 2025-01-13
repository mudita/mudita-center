/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { defineMessages } from "react-intl"
import { CustomModalError, IconType } from "generic-view/utils"
import { ButtonAction } from "generic-view/models"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
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
})

interface Props {
  closeAction: ButtonAction
  customError?: CustomModalError
}

export const FilesManagerUploadError: FunctionComponent<Props> = ({
  closeAction,
  customError,
}) => {
  return (
    <>
      <Modal.TitleIcon
        config={{
          type: IconType.Failure,
        }}
      />
      <Modal.Title>
        {customError?.title || intl.formatMessage(messages.title)}
      </Modal.Title>
      <p>
        {customError?.message ||
          intl.formatMessage(messages.defaultErrorMessage)}
      </p>
      <Modal.Buttons config={{ vertical: true }}>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.closeButtonLabel),
            actions: [closeAction],
          }}
        />
      </Modal.Buttons>
    </>
  )
}
