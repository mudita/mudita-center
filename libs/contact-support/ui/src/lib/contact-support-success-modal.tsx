/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages } from "react-intl"
import { ButtonType, IconType, ModalLayer, ModalSize } from "app-theme/models"
import { Button, Modal, Typography } from "app-theme/ui"
import { formatMessage } from "app-localize/utils"

const messages = defineMessages({
  closeButtonText: { id: "general.app.closeButton.text" },
  title: { id: "general.contactSupport.successModal.title" },
  body: { id: "general.contactSupport.successModal.body" },
})

interface ContactSupportModalSuccessProps {
  opened: boolean
  onClose: VoidFunction
}

export const ContactSupportSuccessModal: FunctionComponent<
  ContactSupportModalSuccessProps
> = ({ onClose, opened }) => {
  return (
    <Modal
      opened={opened}
      layer={ModalLayer.ContactSupport}
      size={ModalSize.Small}
    >
      <Modal.TitleIcon type={IconType.Confirm} />
      <Modal.Title>
        {formatMessage(messages.title)}
      </Modal.Title>
      <Typography.P1>{formatMessage(messages.body)}</Typography.P1>
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          onClick={onClose}
        >
          {formatMessage(messages.closeButtonText)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
