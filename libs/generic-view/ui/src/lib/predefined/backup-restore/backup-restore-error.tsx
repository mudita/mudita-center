/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { CustomModalError, IconType } from "generic-view/utils"
import { Modal } from "../../interactive/modal"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ButtonAction } from "generic-view/models"

const messages = defineMessages({
  title: {
    id: "module.genericViews.restore.failure.title",
  },
  defaultErrorMessage: {
    id: "module.genericViews.restore.failure.defaultErrorMessage",
  },
  closeButtonLabel: {
    id: "module.genericViews.restore.failure.closeButtonLabel",
  },
})

interface Props {
  closeAction: ButtonAction
  customError?: CustomModalError
}

export const BackupRestoreError: FunctionComponent<Props> = ({
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
          componentKey="close-restore-modal"
          config={{
            text: intl.formatMessage(messages.closeButtonLabel),
            actions: [closeAction],
          }}
        />
      </Modal.Buttons>
    </>
  )
}
