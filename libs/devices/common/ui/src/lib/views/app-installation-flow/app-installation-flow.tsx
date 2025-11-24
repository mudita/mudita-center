/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { formatMessage, Messages } from "app-localize/utils"
import { IconType } from "app-theme/models"
import {
  GenericConfirmModalProps,
  GenericConfirmModalWithCheckbox,
  GenericProgressModal,
} from "app-theme/ui"
import {
  useAppInstallationFlow,
  UseAppInstallationFlowArgs,
} from "./use-app-installation-flow"

type GenericInstallConfirmModal = {
  confirmInstallModalTitle: Messages
  confirmInstallModalDescription: Messages
  confirmInstallModalConfirmButtonText: Messages
  confirmInstallModalCancelButtonText: Messages
  confirmInstallModalCheckboxText: Messages
  installingModalTitle: Messages
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
  const [flowState, setFlowState] = useState<AppInstallationFlowState>()

  useEffect(() => {
    setFlowState(opened ? AppInstallationFlowState.ConfirmInstall : undefined)
  }, [opened])

  const { runInstall, progress, currentItem } = useAppInstallationFlow({
    install,
  })

  const onConfirm = useCallback(async () => {
    setFlowState(AppInstallationFlowState.Installing)
    const result = await runInstall()

    if (result.ok) {
      setFlowState(AppInstallationFlowState.InstallSuccess)
    } else {
      setFlowState(AppInstallationFlowState.InstallFailed)
    }
  }, [runInstall])

  return (
    <>
      <GenericConfirmModalWithCheckbox
        opened={flowState === AppInstallationFlowState.ConfirmInstall}
        onCancel={onClose}
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
    </>
  )
}

export const mapInstallToGenericModalMessages = (
  messages: GenericInstallConfirmModal
): GenericConfirmModalProps["messages"] => ({
  confirmModalTitle: messages.confirmInstallModalTitle,
  confirmModalDescription: messages.confirmInstallModalDescription,
  confirmModalConfirmButtonText: messages.confirmInstallModalConfirmButtonText,
  confirmModalCancelButtonText: messages.confirmInstallModalCancelButtonText,
  confirmModalCheckboxText: messages.confirmInstallModalCheckboxText,
})
