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
    id: "apiDevice.contacts.duplicates.confirmationModal.title",
  },
  description: {
    id: "apiDevice.contacts.duplicates.confirmationModal.description",
  },
  backButton: {
    id: "general.app.backButton.text",
  },
  mergeAllButton: {
    id: "apiDevice.contacts.duplicates.header.mergeAllButton",
  },
})

interface Props {
  opened: boolean
  duplicatesCount: number
  onConfirm: VoidFunction
  onCancel: VoidFunction
}

export const ConfirmationModal: FunctionComponent<Props> = ({
  opened,
  duplicatesCount,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Error} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1 message={messages.description.id} />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          message={messages.backButton.id}
          onClick={onCancel}
        />
        <Button
          type={ButtonType.Primary}
          message={messages.mergeAllButton.id}
          values={{ count: duplicatesCount }}
          onClick={onConfirm}
        />
      </Modal.Buttons>
    </Modal>
  )
}
