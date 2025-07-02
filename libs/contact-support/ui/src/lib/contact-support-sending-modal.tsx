/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages } from "react-intl"
import { formatMessage } from "app-localize/utils"
import { Modal } from "app-theme/ui"
import { IconType, ModalLayer, ModalSize } from "app-theme/models"
import { ContactSupportFlowTestIds } from "contact-support/models"

const messages = defineMessages({
  sendingTitle: { id: "general.contactSupport.sendingModal.title" },
})

export const ContactSupportSendingModal: FunctionComponent = () => {
  return (
    <Modal
      opened={true}
      layer={ModalLayer.ContactSupport}
      size={ModalSize.Small}
      data-testid={ContactSupportFlowTestIds.ContactSupportModal}
    >
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title>{formatMessage(messages.sendingTitle)}</Modal.Title>
    </Modal>
  )
}
