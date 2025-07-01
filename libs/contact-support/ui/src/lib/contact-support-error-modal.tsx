/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ButtonType, IconType, ModalLayer, ModalSize } from "app-theme/models"
import { Button, Modal } from "app-theme/ui"
import {
  ContactSupportFlowTestIds,
  ContactSupportModalTestIds,
} from "contact-support/models"
import { FunctionComponent } from "react"
import { defineMessages, useIntl } from "react-intl"

const messages = defineMessages({
  title: { id: "component.supportModalErrorTitle" },
  body: { id: "component.supportModalErrorBody" },
  closeButtonLabel: { id: "component.supportModalSuccessButtonLabel" },
})

interface Props {
  closeContactSupportFlow: VoidFunction
}

export const ContactSupportErrorModal: FunctionComponent<Props> = ({
  closeContactSupportFlow,
}) => {
  const intl = useIntl()

  return (
    <Modal
      opened={true}
      layer={ModalLayer.ContactSupport}
      size={ModalSize.Small}
      data-testid={ContactSupportFlowTestIds.ContactSupportModalError}
    >
      <Modal.TitleIcon type={IconType.Failed} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <p>{intl.formatMessage(messages.body)}</p>
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
