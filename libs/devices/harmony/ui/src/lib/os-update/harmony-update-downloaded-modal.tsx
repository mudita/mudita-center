/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { formatMessage, Messages } from "app-localize/utils"

interface Props {
  opened: boolean
  newVersion: string
  onUpdate: VoidFunction
  onClose?: VoidFunction
  messages: {
    harmonyUpdateDownloadedModalTitle: Messages
    harmonyUpdateDownloadedModalDescription: Messages
    harmonyUpdateDownloadedModalUpdateButton: Messages
  }
}

export const HarmonyUpdateDownloadedModal: FunctionComponent<Props> = ({
  opened,
  newVersion,
  onUpdate,
  onClose,
  messages,
}) => {
  return (
    <Modal opened={opened}>
      {onClose && <Modal.CloseButton onClick={onClose} />}
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title
        text={formatMessage(messages.harmonyUpdateDownloadedModalTitle)}
      />

      <Typography.P1
        message={messages.harmonyUpdateDownloadedModalDescription.id}
        values={{ version: newVersion }}
      />

      <Modal.Buttons>
        <Button
          type={ButtonType.Primary}
          size={ButtonSize.Medium}
          onClick={onUpdate}
          message={messages.harmonyUpdateDownloadedModalUpdateButton.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}
