/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "harmony.overview.os.update.modal.available.title",
  },
  description: {
    id: "harmony.overview.os.update.modal.available.description",
  },
  downloadButton: {
    id: "harmony.overview.os.update.modal.available.downloadButton",
  },
})

interface Props {
  opened: boolean
  currentVersion: string
  onDownload: VoidFunction
  onClose: VoidFunction
}

export const HarmonyUpdateAvailableModal: FunctionComponent<Props> = ({
  opened,
  currentVersion,
  onDownload,
  onClose,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title text={formatMessage(messages.title)} />
      <Typography.P1
        message={messages.description.id}
        values={{
          version: currentVersion,
        }}
      />
      <Modal.Buttons>
        <Button
          type={ButtonType.Primary}
          size={ButtonSize.Medium}
          onClick={onDownload}
          message={messages.downloadButton.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}
