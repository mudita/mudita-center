/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { ButtonTextModifier, ButtonType, IconType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.backup.completeModal.title",
  },
  description: {
    id: "apiDevice.backup.completeModal.description",
  },
  closeButtonLabel: {
    id: "general.app.closeButton.text",
  },
  openBackupFolderLabel: {
    id: "apiDevice.backup.completeModal.openBackupFolderButton",
  },
})

interface Props {
  opened?: boolean
  onClose?: VoidFunction
  onBackupDirectoryOpen?: VoidFunction
}

export const CreateBackupCompleteModal: FunctionComponent<Props> = ({
  opened,
  onClose,
  onBackupDirectoryOpen,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.CheckCircle} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1 message={messages.description.id} />
      <Button
        type={ButtonType.Text}
        modifiers={[ButtonTextModifier.Link]}
        icon={IconType.Backup}
        onClick={onBackupDirectoryOpen}
        message={messages.openBackupFolderLabel.id}
      />
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
