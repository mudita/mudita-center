/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useState } from "react"
import { formatMessage, Messages } from "app-localize/utils"
import { IconType } from "app-theme/models"
import {
  GenericConfirmModalProps,
  GenericConfirmModalWithCheckbox,
  GenericFailedModal,
  GenericProgressModal,
  GenericSuccessModal,
} from "app-theme/ui"
import {
  useAppInstallationFlow,
  UseAppInstallationFlowArgs,
} from "./use-app-installation-flow"
import { AppInstallationErrorName } from "devices/common/models"

type GenericInstallConfirmModal = {
  confirmInstallModalTitle: Messages
  confirmInstallModalDescription: Messages
  confirmInstallModalConfirmButtonText: Messages
  confirmInstallModalCheckboxText: Messages
  installingModalTitle: Messages
  installSuccessModalTitle: Messages
  installSuccessModalDescription: Messages
  installFailedModalTitle: Messages
  installFailedModalErrorVersionMessage: Messages
  installFailedModalErrorGlobalMessage: Messages
}

type AppInstallationFlowMessages = GenericInstallConfirmModal

export interface AppInstallationFlowProps {
  opened: boolean
  onClose: VoidFunction
  messages: AppInstallationFlowMessages
  install: UseAppInstallationFlowArgs["install"]
}

enum AppInstallationFlowState {
  ConfirmInstall = "ConfirmInstall",
  Installing = "Installing",
  InstallSuccess = "InstallSuccess",
  InstallFailed = "InstallFailed",
}

export const AppInstallationFlow: FunctionComponent<
  AppInstallationFlowProps
> = ({ opened, onClose, messages, install }) => {
  const [previousOpened, setPreviousOpened] = useState(opened)
  const [flowState, setFlowState] = useState<AppInstallationFlowState>()
  const [installFailedModalMessages, setInstallFailedModalMessages] =
    useState<Messages>(messages.installFailedModalErrorGlobalMessage)

  const { runInstall, progress, currentItem } = useAppInstallationFlow({
    install,
  })

  const onConfirm = useCallback(async () => {
    setFlowState(AppInstallationFlowState.Installing)
    const result = await runInstall()

    if (result.ok) {
      setFlowState(AppInstallationFlowState.InstallSuccess)
    } else {
      result.error.name === AppInstallationErrorName.ErrorVersion
        ? setInstallFailedModalMessages(
            messages.installFailedModalErrorVersionMessage
          )
        : setInstallFailedModalMessages(
            messages.installFailedModalErrorGlobalMessage
          )
      setFlowState(AppInstallationFlowState.InstallFailed)
    }
  }, [
    messages.installFailedModalErrorGlobalMessage,
    messages.installFailedModalErrorVersionMessage,
    runInstall,
  ])

  const handleClose = useCallback(() => {
    setFlowState(undefined)
    onClose()
  }, [onClose])

  if (previousOpened !== opened) {
    setPreviousOpened(opened)
    setFlowState(opened ? AppInstallationFlowState.ConfirmInstall : undefined)
  }

  return (
    <>
      <GenericConfirmModalWithCheckbox
        opened={flowState === AppInstallationFlowState.ConfirmInstall}
        onCancel={handleClose}
        onConfirm={onConfirm}
        messages={mapInstallToGenericModalMessages(messages)}
      />
      <GenericProgressModal
        opened={flowState === AppInstallationFlowState.Installing}
        iconType={IconType.Grid}
        title={formatMessage(messages.installingModalTitle)}
        progressBarMessage={currentItem?.name}
        progress={progress}
      />
      <GenericSuccessModal
        opened={flowState === AppInstallationFlowState.InstallSuccess}
        title={formatMessage(messages.installSuccessModalTitle)}
        description={formatMessage(messages.installSuccessModalDescription)}
        onClose={handleClose}
      />
      <GenericFailedModal
        opened={flowState === AppInstallationFlowState.InstallFailed}
        title={formatMessage(messages.installFailedModalTitle)}
        description={formatMessage(installFailedModalMessages)}
        onClose={handleClose}
      />
    </>
  )
}

export const mapInstallToGenericModalMessages = (
  messages: GenericInstallConfirmModal
): GenericConfirmModalProps["messages"] => ({
  confirmModalTitle: messages.confirmInstallModalTitle,
  confirmModalDescription: messages.confirmInstallModalDescription,
  confirmModalConfirmButtonText: messages.confirmInstallModalConfirmButtonText,
  confirmModalCheckboxText: messages.confirmInstallModalCheckboxText,
})
