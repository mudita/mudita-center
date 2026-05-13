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
  authorizationPromptUnavailableTitle: {
    id: "general.usbAccess.promptFailureModal.title",
  },
  authorizationPromptUnavailableDescription: {
    id: "general.usbAccess.promptFailureModal.description",
  },
  serialPortGroupsNotFoundTitle: {
    id: "general.usbAccess.serialPortGroupsNotFoundModal.title",
  },
  serialPortGroupsNotFoundDescription: {
    id: "general.usbAccess.serialPortGroupsNotFoundModal.description",
  },
  checkboxText: {
    id: "general.usbAccess.promptFailureModal.checkboxText",
  },
  buttonText: {
    id: "general.usbAccess.promptFailureModal.buttonText",
  },
})

export type UsbAccessPromptFailureModalVariant =
  | "authorizationPromptUnavailable"
  | "serialPortGroupsNotFound"

const variantMessages = {
  authorizationPromptUnavailable: {
    title: messages.authorizationPromptUnavailableTitle,
    description: messages.authorizationPromptUnavailableDescription,
  },
  serialPortGroupsNotFound: {
    title: messages.serialPortGroupsNotFoundTitle,
    description: messages.serialPortGroupsNotFoundDescription,
  },
}

interface Props {
  opened: boolean
  variant: UsbAccessPromptFailureModalVariant
  onClose: VoidFunction
  onAction: (suppressPromptFailureModal: boolean) => void
}

export const UsbAccessPromptFailureModal: FunctionComponent<Props> = ({
  opened,
  variant,
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

  const selectedMessages = variantMessages[variant]

  return (
    <GenericInfoModal
      opened={opened}
      title={formatMessage(selectedMessages.title)}
      iconType={IconType.Failed}
      closeVariant={CloseVariant.Icon}
      onClose={onClose}
      description={formatMessage(selectedMessages.description)}
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
