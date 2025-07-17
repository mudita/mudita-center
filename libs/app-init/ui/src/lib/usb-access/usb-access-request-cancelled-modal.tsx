/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages } from "react-intl"
import { formatMessage } from "app-localize/utils"
import { ButtonType, IconType, ModalLayer, ModalSize } from "app-theme/models"
import { Button, Modal, Typography } from "app-theme/ui"
import { UsbAccessTestIds } from "app-init/models"

const messages = defineMessages({
  title: {
    id: "general.usbAccess.requestCancelledModal.title",
  },
  description: {
    id: "general.usbAccess.requestCancelledModal.description",
  },
  buttonText: {
    id: "general.usbAccess.requestCancelledModal.buttonText",
  },
})

interface Props {
  opened: boolean
  onClose: VoidFunction
  onAction: VoidFunction
}

export const UsbAccessRequestCancelledModal: FunctionComponent<Props> = ({
  opened,
  onClose,
  onAction,
}) => {
  return (
    <Modal opened={opened} layer={ModalLayer.UsbAccess} size={ModalSize.Small}>
      <Modal.TitleIcon type={IconType.Failed} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
      <Modal.CloseButton onClick={onClose} />
      <Typography.P1
        data-testid={UsbAccessTestIds.RequestCancelledModalDescription}
      >
        {formatMessage(messages.description)}
      </Typography.P1>
      <Modal.Buttons>
        <Button
          data-testid={UsbAccessTestIds.RequestCancelledModalButton}
          type={ButtonType.Primary}
          onClick={onAction}
        >
          {formatMessage(messages.buttonText)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
