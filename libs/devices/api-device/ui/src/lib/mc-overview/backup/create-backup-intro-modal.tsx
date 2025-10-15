/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { BackupSectionConfig } from "devices/api-device/models"
import { Button, Modal, Typography } from "app-theme/ui"
import { ButtonType, IconType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.backup.introModal.title",
  },
  description: {
    id: "apiDevice.backup.introModal.description",
  },
  cancelButtonLabel: {
    id: "general.app.cancelButton.text",
  },
  confirmButtonLabel: {
    id: "apiDevice.backup.introModal.createButton",
  },
})

interface Props {
  opened?: boolean
  features: BackupSectionConfig["backupFeatures"]
  onClose?: VoidFunction
  onConfirm?: VoidFunction
}

export const CreateBackupIntroModal: FunctionComponent<Props> = ({
  opened,
  features,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Backup} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1 message={messages.description.id} />
      <Modal.ScrollableContent>
        <Typography.P1 as={"ul"}>
          {features?.map((feature) => (
            <Typography.LI key={feature.key}>{feature.label}</Typography.LI>
          ))}
        </Typography.P1>
      </Modal.ScrollableContent>
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          onClick={onClose}
          message={messages.cancelButtonLabel.id}
        />
        <Button
          type={ButtonType.Primary}
          onClick={onConfirm}
          message={messages.confirmButtonLabel.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}
