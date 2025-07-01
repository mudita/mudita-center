/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, useIntl } from "react-intl"
import { Modal } from "app-theme/ui"
import { IconType, ModalLayer, ModalSize } from "app-theme/models"
import { ContactSupportFlowTestIds } from "contact-support/models"

const messages = defineMessages({
  sendingTitle: { id: "component.contactSupport.modal.sendingTitle" },
})

export const ContactSupportSendingModal: FunctionComponent = () => {
  const intl = useIntl()

  return (
    <Modal
      opened={true}
      layer={ModalLayer.ContactSupport}
      size={ModalSize.Small}
      data-testid={ContactSupportFlowTestIds.ContactSupportModal}
    >
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title>{intl.formatMessage(messages.sendingTitle)}</Modal.Title>
    </Modal>
  )
}
