/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages } from "react-intl"
import { ButtonType, IconType, ModalLayer, ModalSize } from "app-theme/models"
import { Button, Modal, Typography } from "app-theme/ui"
import {
  ContactSupportFlowTestIds,
  ContactSupportModalTestIds,
} from "contact-support/models"
import { formatMessage } from "app-localize/utils"

const messages = defineMessages({
  closeButtonText: { id: "general.app.closeButton.text" },
  title: { id: "general.contactSupport.successModal.title" },
  body: { id: "general.contactSupport.successModal.body" },
})

interface ContactSupportModalSuccessProps {
  onClose: VoidFunction
}

export const ContactSupportSuccessModal: FunctionComponent<
  ContactSupportModalSuccessProps
> = ({ onClose }) => {
  return (
    <Modal
      opened={true}
      layer={ModalLayer.ContactSupport}
      size={ModalSize.Small}
      data-testid={ContactSupportFlowTestIds.ContactSupportModalSuccess}
    >
      <Modal.TitleIcon type={IconType.Confirm} />
      <Modal.Title data-testid={ContactSupportModalTestIds.Title}>
        {formatMessage(messages.title)}
      </Modal.Title>
      <Typography.P1>{formatMessage(messages.body)}</Typography.P1>
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          onClick={onClose}
          data-testid={ContactSupportModalTestIds.CloseButton}
        >
          {formatMessage(messages.closeButtonText)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
