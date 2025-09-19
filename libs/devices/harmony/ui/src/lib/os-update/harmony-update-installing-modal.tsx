/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import { Button, Modal, ProgressBar, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { HarmonyOSUpdateStatus } from "devices/harmony/models"

const messages = defineMessages({
  title: {
    id: "harmony.overview.os.update.modal.installing.title",
  },
  description: {
    id: "harmony.overview.os.update.modal.installing.description",
  },
  descriptionSequential: {
    id: "harmony.overview.os.update.modal.installing.descriptionSequential",
  },
  cancelButton: {
    id: "general.app.cancelButton.text",
  },
  progressPreparing: {
    id: "harmony.overview.os.update.modal.installing.progress.idle",
  },
  progressInstalling: {
    id: "harmony.overview.os.update.modal.installing.progress.installing",
  },
  progressRestarting: {
    id: "harmony.overview.os.update.modal.installing.progress.restarting",
  },
})

interface Props {
  opened: boolean
  progress?: number
  status?: HarmonyOSUpdateStatus
  totalSteps?: number
  currentStep?: number
  onCancel: VoidFunction
}

export const HarmonyUpdateInstallingModal: FunctionComponent<Props> = ({
  opened,
  progress = 0,
  status,
  totalSteps = 1,
  currentStep = 1,
  onCancel,
}) => {
  const progressMessage = useMemo(() => {
    if (status === HarmonyOSUpdateStatus.Installing) {
      return formatMessage(messages.progressInstalling, {
        currentStep,
        totalSteps,
      })
    }
    if (status === HarmonyOSUpdateStatus.Restarting) {
      return formatMessage(messages.progressRestarting)
    }
    return formatMessage(messages.progressPreparing)
  }, [currentStep, status, totalSteps])

  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title text={formatMessage(messages.title)} />
      {totalSteps > 1 ? (
        <Typography.P1 message={messages.descriptionSequential.id} />
      ) : (
        <Typography.P1 message={messages.description.id} />
      )}
      <ProgressBar
        value={progress}
        message={progressMessage}
        indeterminate={status === HarmonyOSUpdateStatus.Restarting}
      />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          size={ButtonSize.Medium}
          onClick={onCancel}
          message={messages.cancelButton.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}
