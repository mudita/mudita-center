/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  RefObject,
  useCallback,
  useImperativeHandle,
  useState,
} from "react"
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
import { FileManagerFile } from "../manage-files/manage-files.types"

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
  messages: AppInstallationFlowMessages
  install: UseAppInstallationFlowArgs["install"]
  ref?: RefObject<{
    install: (item: FileManagerFile) => void
    close: VoidFunction
  } | null>
}

enum AppInstallationFlowState {
  Idle = "Idle",
  ConfirmInstall = "ConfirmInstall",
  Installing = "Installing",
  InstallSuccess = "InstallSuccess",
  InstallFailed = "InstallFailed",
}

export const AppInstallationFlow: FunctionComponent<
  AppInstallationFlowProps
> = ({ messages, install, ref }) => {
  const [itemToInstall, setItemToInstall] = useState<
    FileManagerFile | undefined
  >()
  const [flowState, setFlowState] = useState<AppInstallationFlowState>()
  const [installFailedModalMessages, setInstallFailedModalMessages] =
    useState<Messages>(messages.installFailedModalErrorGlobalMessage)

  const { runInstall, progress, currentItem } = useAppInstallationFlow({
    install,
  })

  const onConfirm = useCallback(async () => {
    if (!itemToInstall) {
      setFlowState(AppInstallationFlowState.Idle)
      return
    }
    setFlowState(AppInstallationFlowState.Installing)
    const result = await runInstall(itemToInstall)

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
    itemToInstall,
    messages.installFailedModalErrorGlobalMessage,
    messages.installFailedModalErrorVersionMessage,
    runInstall,
  ])

  const handleClose = useCallback(() => {
    setItemToInstall(undefined)
    setFlowState(AppInstallationFlowState.Idle)
  }, [])

  useImperativeHandle(ref, () => ({
    install: (item: FileManagerFile) => {
      setItemToInstall(item)
      setFlowState(AppInstallationFlowState.ConfirmInstall)
    },
    close: handleClose,
  }))

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

// eslint-disable-next-line no-redeclare
export type AppInstallationFlow = NonNullable<
  AppInstallationFlowProps["ref"]
>["current"]

export const mapInstallToGenericModalMessages = (
  messages: GenericInstallConfirmModal
): GenericConfirmModalProps["messages"] => ({
  confirmModalTitle: messages.confirmInstallModalTitle,
  confirmModalDescription: messages.confirmInstallModalDescription,
  confirmModalConfirmButtonText: messages.confirmInstallModalConfirmButtonText,
  confirmModalCheckboxText: messages.confirmInstallModalCheckboxText,
})
