/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { defineMessages } from "app-localize/utils"
import { ButtonType, IconType } from "app-theme/models"

const messages = defineMessages({
  title: {
    id: "apiDevice.contacts.import.errorModal.title",
  },
  description: {
    id: "apiDevice.contacts.import.errorModal.description",
  },
  closeButtonText: {
    id: "general.app.closeButton.text",
  },
})

interface Props {
  opened: boolean
  onClose: VoidFunction
}

export const ImportErrorModal: FunctionComponent<Props> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Failed} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1 message={messages.description.id} />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          onClick={onClose}
          message={messages.closeButtonText.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}
