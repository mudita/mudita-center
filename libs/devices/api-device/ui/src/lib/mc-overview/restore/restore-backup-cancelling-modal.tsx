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
    id: "apiDevice.restore.cancellingModal.title",
  },
  description: {
    id: "apiDevice.restore.cancellingModal.description",
  },
  backButtonLabel: {
    id: "general.app.backButton.text",
  },
  confirmButtonLabel: {
    id: "apiDevice.restore.cancellingModal.confirmButton",
  },
})

interface Props {
  opened?: boolean
  onBack?: VoidFunction
  onConfirm?: VoidFunction
}

export const RestoreBackupCancellingModal: FunctionComponent<Props> = ({
  opened,
  onBack,
  onConfirm,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Error} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1 message={messages.description.id} />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          onClick={onBack}
          message={messages.backButtonLabel.id}
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
