/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, useIntl } from "react-intl"
import { ButtonType, IconType, ModalLayer, ModalSize } from "app-theme/models"
import { Button, Modal } from "app-theme/ui"
import {
  ContactSupportFlowTestIds,
  ContactSupportModalTestIds,
} from "contact-support/models"

const messages = defineMessages({
  title: { id: "component.supportModalSuccessTitle" },
  body: { id: "component.supportModalSuccessBody" },
  closeButtonLabel: { id: "component.supportModalSuccessButtonLabel" },
})

interface ContactSupportModalSuccessProps {
  closeContactSupportFlow: VoidFunction
}

export const ContactSupportSuccessModal: FunctionComponent<
  ContactSupportModalSuccessProps
> = ({ closeContactSupportFlow }) => {
  const intl = useIntl()

  return (
    <Modal
      opened={true}
      layer={ModalLayer.ContactSupport}
      size={ModalSize.Small}
      data-testid={ContactSupportFlowTestIds.ContactSupportModalSuccess}
    >
      <Modal.TitleIcon type={IconType.Confirm} />
      <Modal.Title data-testid={ContactSupportModalTestIds.Title}>
        {intl.formatMessage(messages.title)}
      </Modal.Title>
      <p data-testid={ContactSupportModalTestIds.Description}>
        {intl.formatMessage(messages.body)}
      </p>
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          onClick={closeContactSupportFlow}
          data-testid={ContactSupportModalTestIds.CloseButton}
        >
          {intl.formatMessage(messages.closeButtonLabel)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
