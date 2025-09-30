/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { HarmonyOSUpdateError } from "devices/harmony/models"

const messages = defineMessages({
  title: {
    id: "harmony.overview.os.update.modal.error.title",
  },
  description: {
    id: "harmony.overview.os.update.modal.error.description",
  },
  helpButton: {
    id: "harmony.overview.os.update.modal.error.helpButton",
  },
  tryAgainButton: {
    id: "harmony.overview.os.update.modal.error.tryAgainButton",
  },
  closeButton: {
    id: "harmony.overview.os.update.modal.error.closeButton",
  },
  contactSupportButton: {
    id: "harmony.overview.os.update.modal.error.contactSupportButton",
  },
  batteryFlatTitle: {
    id: "harmony.overview.os.update.modal.error.batteryFlat.title",
  },
  batteryFlatDescription: {
    id: "harmony.overview.os.update.modal.error.batteryFlat.description",
  },
  checkingForUpdateFailedTitle: {
    id: "harmony.overview.os.update.modal.error.checkingForUpdateFailed.title",
  },
  checkingForUpdateFailedDescription: {
    id: "harmony.overview.os.update.modal.error.checkingForUpdateFailed.description",
  },
  downloadingUpdateFailedTitle: {
    id: "harmony.overview.os.update.modal.error.downloadingUpdateFailed.title",
  },
  downloadingUpdateFailedDescription: {
    id: "harmony.overview.os.update.modal.error.downloadingUpdateFailed.description",
  },
  installingAbortedTitle: {
    id: "harmony.overview.os.update.modal.error.installingAborted.title",
  },
  installingAbortedDescription: {
    id: "harmony.overview.os.update.modal.error.installingAborted.description",
  },
  installingFailedTitle: {
    id: "harmony.overview.os.update.modal.error.installingFailed.title",
  },
  installingFailedDescription: {
    id: "harmony.overview.os.update.modal.error.installingFailed.description",
  },
  notEnoughSpaceTitle: {
    id: "harmony.overview.os.update.modal.error.notEnoughSpace.title",
  },
  notEnoughSpaceDescription: {
    id: "harmony.overview.os.update.modal.error.notEnoughSpace.description",
  },
})

type Errors =
  | {
      error?: Exclude<
        HarmonyOSUpdateError,
        HarmonyOSUpdateError.NotEnoughSpace | HarmonyOSUpdateError.UpdateAborted
      >
    }
  | {
      error: HarmonyOSUpdateError.UpdateAborted
      currentVersion: string
    }
  | {
      error: HarmonyOSUpdateError.NotEnoughSpace
      requiredSpace: number
    }

type Props = {
  opened: boolean
  onContactSupport: VoidFunction
  onGoToHelp: VoidFunction
  onTryAgain: VoidFunction
  onClose?: VoidFunction
  onButtonClose: VoidFunction
} & Errors

export const HarmonyUpdateErrorModal: FunctionComponent<Props> = ({
  opened,
  onContactSupport,
  onGoToHelp,
  onTryAgain,
  onClose,
  onButtonClose,
  ...errorInfo
}) => {
  return (
    <Modal opened={opened}>
      {onClose && <Modal.CloseButton onClick={onClose} />}
      {errorInfo.error === HarmonyOSUpdateError.BatteryFlat ? (
        <Modal.TitleIcon type={IconType.BatteryFlat} />
      ) : (
        <Modal.TitleIcon type={IconType.Failed} />
      )}
      {errorInfo.error === HarmonyOSUpdateError.BatteryFlat ? (
        <>
          <Modal.Title text={formatMessage(messages.batteryFlatTitle)} />
          <Typography.P1 message={messages.batteryFlatDescription.id} />
        </>
      ) : errorInfo.error === HarmonyOSUpdateError.AvailabilityCheckFailed ? (
        <>
          <Modal.Title
            text={formatMessage(messages.checkingForUpdateFailedTitle)}
          />
          <Typography.P1
            message={messages.checkingForUpdateFailedDescription.id}
          />
        </>
      ) : errorInfo.error === HarmonyOSUpdateError.DownloadFailed ? (
        <>
          <Modal.Title
            text={formatMessage(messages.downloadingUpdateFailedTitle)}
          />
          <Typography.P1
            message={messages.downloadingUpdateFailedDescription.id}
          />
        </>
      ) : errorInfo.error === HarmonyOSUpdateError.UpdateAborted ? (
        <>
          <Modal.Title text={formatMessage(messages.installingAbortedTitle)} />
          <Typography.P1
            message={messages.installingAbortedDescription.id}
            values={{ version: errorInfo.currentVersion }}
          />
        </>
      ) : errorInfo.error === HarmonyOSUpdateError.UpdateFailed ? (
        <>
          <Modal.Title text={formatMessage(messages.installingFailedTitle)} />
          <Typography.P1 message={messages.installingFailedDescription.id} />
        </>
      ) : errorInfo.error === HarmonyOSUpdateError.NotEnoughSpace ? (
        <>
          <Modal.Title text={formatMessage(messages.notEnoughSpaceTitle)} />
          <Typography.P1
            message={messages.notEnoughSpaceDescription.id}
            values={{
              requiredSpace: Math.ceil(errorInfo.requiredSpace / 1024 ** 2),
            }}
          />
        </>
      ) : (
        <>
          <Modal.Title text={formatMessage(messages.title)} />
          <Typography.P1 message={messages.description.id} />
        </>
      )}
      {errorInfo.error === HarmonyOSUpdateError.UpdateAborted ? (
        <Modal.Buttons>
          <Button
            type={ButtonType.Secondary}
            size={ButtonSize.Medium}
            onClick={onButtonClose}
            message={messages.closeButton.id}
          />
        </Modal.Buttons>
      ) : (
        <Modal.Buttons>
          <Button
            type={ButtonType.Secondary}
            size={ButtonSize.Medium}
            onClick={onContactSupport}
            message={messages.contactSupportButton.id}
          />
          {errorInfo.error === HarmonyOSUpdateError.AvailabilityCheckFailed ||
          errorInfo.error === HarmonyOSUpdateError.DownloadFailed ? (
            <Button
              type={ButtonType.Primary}
              size={ButtonSize.Medium}
              onClick={onTryAgain}
              message={messages.tryAgainButton.id}
            />
          ) : (
            <Button
              type={ButtonType.Primary}
              size={ButtonSize.Medium}
              onClick={onGoToHelp}
              message={messages.helpButton.id}
            />
          )}
        </Modal.Buttons>
      )}
    </Modal>
  )
}
