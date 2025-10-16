/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, ProgressBar, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.backup.progressModal.title",
  },
  description: {
    id: "apiDevice.backup.progressModal.description",
  },
  cancelButtonLabel: {
    id: "general.app.cancelButton.text",
  },
})

interface Props {
  opened?: boolean
  progress: {
    value: number
    message?: string
  }
  onClose?: VoidFunction
}

export const CreateBackupProgressModal: FunctionComponent<Props> = ({
  opened,
  progress,
  onClose,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Backup} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1 message={messages.description.id} />
      <ProgressBar value={progress.value} message={progress.message} />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          size={ButtonSize.Medium}
          onClick={onClose}
          message={messages.cancelButtonLabel.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}
