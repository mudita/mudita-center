/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Modal, ProgressBar, Typography } from "app-theme/ui"
import { IconType } from "app-theme/models"
import { FunctionComponent } from "react"
import { defineMessages, formatMessage } from "app-localize/utils"
import { AppUpdaterTestIds } from "app-updater/models"

const messages = defineMessages({
  title: {
    id: "general.appUpdate.progressModal.title",
  },
  description: {
    id: "general.appUpdate.progressModal.description",
  },
})

interface Props {
  opened: boolean
  progress?: number
  onClose?: VoidFunction
}

export const UpdateInProgressModal: FunctionComponent<Props> = ({
  opened,
  progress = 0,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
      <Typography.P1
        data-testid={AppUpdaterTestIds.UpdateInProgressModalDescription}
      >
        {formatMessage(messages.description)}
      </Typography.P1>
      <ProgressBar value={Math.floor(progress)} />
    </Modal>
  )
}
