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
    id: "harmony.overview.os.update.modal.batteryFlat.title",
  },
  description: {
    id: "harmony.overview.os.update.modal.batteryFlat.description",
  },
  cancelButton: {
    id: "general.app.cancelButton.text",
  },
})

interface Props {
  opened: boolean
  currentVersion: string
  onClose: VoidFunction
}

export const HarmonyUpdateBatteryFlatModal: FunctionComponent<Props> = ({
  opened,
  currentVersion,
  onClose,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.BatteryFlat} />
      <Modal.Title text={formatMessage(messages.title)} />
      <Typography.P1
        message={messages.description.id}
        values={{ version: currentVersion }}
      />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          size={ButtonSize.Medium}
          onClick={onClose}
          message={messages.cancelButton.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}
