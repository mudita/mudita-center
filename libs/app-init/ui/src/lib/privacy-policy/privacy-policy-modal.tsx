/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal } from "app-theme/ui"
import {
  ButtonTextModifier,
  ButtonType,
  IconType,
  ModalLayer,
} from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

interface Props {
  opened: boolean
  onAccept: () => void
  onClose: () => void
  onLinkClick?: () => void
}

const messages = defineMessages({
  title: {
    id: "general.privacyPolicyModal.title",
  },
  description: {
    id: "general.privacyPolicyModal.description",
  },
  linkText: {
    id: "general.privacyPolicyModal.link.text",
  },
  linkUrl: {
    id: "general.privacyPolicyModal.link.url",
  },
  button: {
    id: "general.privacyPolicyModal.button.text",
  },
})

export const PrivacyPolicyModal: FunctionComponent<Props> = ({
  opened,
  onAccept,
  onClose,
  onLinkClick,
}) => {
  return (
    <Modal opened={opened} layer={ModalLayer.PrivacyPolicy}>
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
      <Modal.CloseButton onClick={onClose} />
      <Modal.DenseContent>
        <p>{formatMessage(messages.description)}</p>
        <Button
          onClick={onLinkClick}
          type={ButtonType.Text}
          modifiers={[ButtonTextModifier.Link]}
        >
          {formatMessage(messages.linkText)}
        </Button>
      </Modal.DenseContent>
      <Modal.Buttons>
        <Button type={ButtonType.Primary} onClick={onAccept}>
          {formatMessage(messages.button)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
