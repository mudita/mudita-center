/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages } from "react-intl"
import { formatMessage } from "app-localize/utils"
import { ButtonType, IconType, ModalLayer, ModalSize } from "app-theme/models"
import { Button, Modal, Typography } from "app-theme/ui"

const messages = defineMessages({
  closeButtonText: { id: "general.app.closeButton.text" },
  title: { id: "general.contactSupport.errorModal.title" },
  body: { id: "general.contactSupport.errorModal.body" },
})

interface Props {
  opened: boolean
  onClose: VoidFunction
}

export const ContactSupportErrorModal: FunctionComponent<Props> = ({
  onClose,
  opened,
}) => {
  return (
    <Modal
      opened={opened}
      layer={ModalLayer.ContactSupport}
      size={ModalSize.Small}
    >
      <Modal.TitleIcon type={IconType.Failed} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
      <Typography.P1>{formatMessage(messages.body)}</Typography.P1>
      <Modal.Buttons>
        <Button type={ButtonType.Secondary} onClick={onClose}>
          {formatMessage(messages.closeButtonText)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
