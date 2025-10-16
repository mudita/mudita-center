/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { ButtonType, IconType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.backup.cancelledModal.title",
  },
  description: {
    id: "apiDevice.backup.cancelledModal.description",
  },
  closeButtonLabel: {
    id: "general.app.closeButton.text",
  },
})

interface Props {
  opened?: boolean
  onClose?: VoidFunction
}

export const CreateBackupCancelledModal: FunctionComponent<Props> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Failed} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1 message={messages.description.id} />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          onClick={onClose}
          message={messages.closeButtonLabel.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}
