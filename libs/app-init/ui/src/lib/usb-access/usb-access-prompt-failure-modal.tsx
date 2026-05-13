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
import { ButtonType, IconType } from "app-theme/models"
import {
  Button,
  Checkbox,
  CloseVariant,
  GenericInfoModal,
  Modal,
} from "app-theme/ui"

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
    <GenericInfoModal
      opened={opened}
      title={formatMessage(messages.title)}
      iconType={IconType.Failed}
      closeVariant={CloseVariant.Icon}
      onClose={onClose}
      description={formatMessage(messages.description)}
    >
      <Checkbox onChange={handleCheckboxChange}>
        {formatMessage(messages.checkboxText)}
      </Checkbox>
      <Modal.Buttons>
        <Button type={ButtonType.Primary} onClick={handleAction}>
          {formatMessage(messages.buttonText)}
        </Button>
      </Modal.Buttons>
    </GenericInfoModal>
  )
}
