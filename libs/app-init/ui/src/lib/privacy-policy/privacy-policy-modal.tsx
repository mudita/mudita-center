/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import {
  ButtonTextModifier,
  ButtonType,
  IconType,
  ModalLayer,
} from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { AppLegalPaths } from "app-routing/models"

interface Props {
  opened: boolean
  onAccept: () => void
  onClose: () => void
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
}) => {
  return (
    <Modal opened={opened} layer={ModalLayer.PrivacyPolicy}>
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
      <Modal.CloseButton onClick={onClose} />
      <Modal.DenseContent>
        <Typography.P1>{formatMessage(messages.description)}</Typography.P1>
        <Button
          to={AppLegalPaths.PrivacyPolicy}
          target="appWindow"
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
