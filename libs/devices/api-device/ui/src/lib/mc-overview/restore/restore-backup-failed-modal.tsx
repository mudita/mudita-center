/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, formatBytes, Modal, Typography } from "app-theme/ui"
import { ButtonType, IconType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "apiDevice.restore.failedModal.title",
  },
  description: {
    id: "apiDevice.restore.failedModal.description.unknown",
  },
  descriptionSpace: {
    id: "apiDevice.restore.failedModal.description.notEnoughSpace",
  },
  closeButtonLabel: {
    id: "general.app.closeButton.text",
  },
})

interface Props {
  opened?: boolean
  onClose?: VoidFunction
  errorType: "unknown" | "space"
  spaceToFree?: number
}

export const RestoreBackupFailedModal: FunctionComponent<Props> = ({
  opened,
  onClose,
  errorType,
  spaceToFree = 0,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Failed} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1
        message={
          errorType === "space"
            ? messages.descriptionSpace.id
            : messages.description.id
        }
        values={{
          space: formatBytes(Math.ceil(spaceToFree / 1000 ** 2) * 1000 ** 2, {
            minUnit: "MB",
          }),
        }}
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
