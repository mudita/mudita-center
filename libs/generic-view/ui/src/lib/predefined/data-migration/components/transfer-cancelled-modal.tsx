/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { Modal } from "../../../interactive/modal/modal"
import { IconType } from "generic-view/utils"
import { ButtonSecondary } from "../../../buttons/button-secondary"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { TransferFailMessage } from "./transfer-fail-message"
import { ButtonAction } from "generic-view/models"

const messages = defineMessages({
  title: {
    id: "module.genericViews.dataMigration.cancelled.title",
  },
  closeButtonLabel: {
    id: "module.genericViews.dataMigration.failure.closeButtonLabel",
  },
})

interface Props {
  onClose?: VoidFunction
}

export const CancelledModal: FunctionComponent<Props> = ({ onClose }) => {
  const closeAction: ButtonAction = {
    type: "custom",
    callback: () => onClose?.(),
  }

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.Failure }} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <TransferFailMessage />
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
