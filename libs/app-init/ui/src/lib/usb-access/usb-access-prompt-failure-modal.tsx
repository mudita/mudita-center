/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useState,
} from "react"
import { defineMessages } from "react-intl"
import { formatMessage } from "app-localize/utils"
import { ButtonType, IconType, ModalLayer, ModalSize } from "app-theme/models"
import { Button, Checkbox, Modal, Typography } from "app-theme/ui"
import { UsbAccessTestIds } from "app-init/models"

const messages = defineMessages({
  title: {
    id: "general.usbAccess.promptFailureModal.title",
  },
  description: {
    id: "general.usbAccess.promptFailureModal.description",
  },
  checkboxText: {
    id: "general.usbAccess.promptFailureModal.checkboxText",
  },
  buttonText: {
    id: "general.usbAccess.promptFailureModal.buttonText",
  },
})

interface Props {
  opened: boolean
  onClose: VoidFunction
  onAction: (suppressPromptFailureModal: boolean) => void
}

export const UsbAccessPromptFailureModal: FunctionComponent<Props> = ({
  opened,
  onClose,
  onAction,
}) => {
  const [suppressPromptFailureModal, setSuppressPromptFailureModal] =
    useState(false)

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setSuppressPromptFailureModal(event.target.checked)
    }, [])

  const handleAction = useCallback(() => {
    onAction(suppressPromptFailureModal)
  }, [onAction, suppressPromptFailureModal])

  return (
    <Modal opened={opened} layer={ModalLayer.UsbAccess} size={ModalSize.Small}>
      <Modal.TitleIcon type={IconType.Failed} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
      <Modal.CloseButton onClick={onClose} />
      <Typography.P1 data-testid={UsbAccessTestIds.PromptFailureModalDescription}>
        {formatMessage(messages.description)}
      </Typography.P1>
      <Checkbox
        data-testid={UsbAccessTestIds.PromptFailureModalCheckbox}
        onChange={handleCheckboxChange}
      >
        {formatMessage(messages.checkboxText)}
      </Checkbox>
      <Modal.Buttons>
        <Button
          data-testid={UsbAccessTestIds.PromptFailureModalButton}
          type={ButtonType.Primary}
          onClick={handleAction}
        >
          {formatMessage(messages.buttonText)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
