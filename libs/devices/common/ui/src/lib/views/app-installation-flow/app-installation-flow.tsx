/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { Messages } from "app-localize/utils"
import {
  GenericConfirmModalProps,
  GenericConfirmModalWithCheckbox,
} from "app-theme/ui"

type GenericInstallConfirmModal = {
  confirmInstallModalTitle: Messages
  confirmInstallModalDescription: Messages
  confirmInstallModalConfirmButtonText: Messages
  confirmInstallModalCancelButtonText: Messages
  confirmInstallModalCheckboxText: Messages
}

type AppInstallationFlowMessages = GenericInstallConfirmModal

interface AppInstallationFlowProps {
  opened: boolean
  onClose: VoidFunction
  messages: AppInstallationFlowMessages
}

enum AppInstallationFlowState {
  ConfirmInstall = "ConfirmInstall",
  Installing = "Installing",
  InstallSuccess = "InstallSuccess",
  InstallFailed = "InstallFailed",
}

export const AppInstallationFlow: FunctionComponent<
  AppInstallationFlowProps
> = ({ opened, onClose, messages }) => {
  const [flowState, setFlowState] = useState<AppInstallationFlowState>()

  const onConfirm = useCallback(() => {
    setFlowState(undefined)
  }, [])

  useEffect(() => {
    setFlowState(opened ? AppInstallationFlowState.ConfirmInstall : undefined)
  }, [opened])

  return (
    <GenericConfirmModalWithCheckbox
      opened={flowState === AppInstallationFlowState.ConfirmInstall}
      onCancel={onClose}
      onConfirm={onConfirm}
      messages={mapInstallToGenericModalMessages(messages)}
    />
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
