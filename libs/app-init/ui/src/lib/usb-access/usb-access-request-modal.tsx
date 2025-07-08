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
  title: {
    id: "general.usbAccess.requestModal.title",
  },
  description: {
    id: "general.usbAccess.requestModal.description",
  },
  buttonText: {
    id: "general.usbAccess.requestModal.buttonText",
  },
})

interface Props {
  opened: boolean
  onClose: VoidFunction
  onAction: VoidFunction
}

export const UsbAccessRequestModal: FunctionComponent<Props> = ({
  opened,
  onClose,
  onAction,
}) => {
  return (
    <Modal opened={opened} layer={ModalLayer.UsbAccess} size={ModalSize.Small}>
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
      <Modal.CloseButton onClick={onClose} />
      <Modal.DenseContent>
        <Typography.P1>{formatMessage(messages.description)}</Typography.P1>
      </Modal.DenseContent>
      <Modal.Buttons>
        <Button type={ButtonType.Primary} onClick={onAction}>
          {formatMessage(messages.buttonText)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
