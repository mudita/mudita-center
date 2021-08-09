/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import {
  ModalContent,
  RoundIconWrapper,
} from "Renderer/components/core/modal-dialog/modal-dialog-shared"
import { Size } from "Renderer/components/core/button/button.config"
import { AppUpdateStepModalTestIds } from "Renderer/wrappers/app-update-step-modal/app-update-step-modal-test-ids.enum"

export interface AppUpdateAvailableProps {
  appLatestVersion?: string
}

const messages = defineMessages({
  appUpdateTitle: { id: "component.updateModalTitle" },
  availableUpdateMessage: { id: "component.updateAvailableModalMessage" },
  availableUpdateAppVersion: { id: "component.updateAvailableModalVersion" },
  availableUpdateButton: { id: "component.updateAvailableModalButton" },
  availableUpdateDescription: {
    id: "component.updateAvailableModalDescription",
  },
  downloadedUpdateMessage: { id: "component.updateDownloadedModalMessage" },
  downloadedUpdateDescription: {
    id: "component.updateDownloadedModalDescription",
  },
  downloadedUpdateWarning: {
    id: "component.updateDownloadedModalWarning",
  },
  downloadedUpdateButton: { id: "component.updateDownloadedModalButton" },
  downloadedUpdateCloseButton: {
    id: "component.updateDownloadedModalCloseButton",
  },
  errorUpdateMessage: {
    id: "component.updateErrorModalMessage",
  },
  errorUpdateDescription: {
    id: "component.updateErrorModalDescription",
  },
  downloadUpdateCloseButton: {
    id: "component.updateDownloadCloseButton",
  },
  progressUpdateTitle: {
    id: "component.updateProgressModalTitle",
  },
  progressUpdateDescription: {
    id: "component.updateProgressModalDescription",
  },
})

const AppUpdateModal: FunctionComponent<ComponentProps<typeof ModalDialog>> = ({
  children,
  testId,
  ...props
}) => (
  <ModalDialog
    size={ModalSize.Small}
    title={intl.formatMessage(messages.appUpdateTitle)}
    {...props}
  >
    <ModalContent data-testid={testId}>
      <RoundIconWrapper>
        <Icon type={Type.Pure} width={4} />
      </RoundIconWrapper>
      {children}
    </ModalContent>
  </ModalDialog>
)

export const AppUpdateAvailable: FunctionComponent<
  ComponentProps<typeof ModalDialog> & AppUpdateAvailableProps
> = ({ appLatestVersion, ...props }) => (
  <AppUpdateModal
    testId={AppUpdateStepModalTestIds.AppUpdateAvailableModal}
    actionButtonLabel={intl.formatMessage(messages.availableUpdateButton)}
    closeButton={false}
    actionButtonSize={Size.FixedBig}
    {...props}
  >
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.availableUpdateMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedLightText}
      message={{
        ...messages.availableUpdateAppVersion,
        values: { version: appLatestVersion },
      }}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedLightText}
      message={messages.availableUpdateDescription}
    />
  </AppUpdateModal>
)

export const AppUpdateError: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => (
  <AppUpdateModal
    testId={AppUpdateStepModalTestIds.AppUpdateErrorModal}
    {...props}
  >
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.errorUpdateMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={messages.errorUpdateDescription}
    />
  </AppUpdateModal>
)

export const AppUpdateDownloaded: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => (
  <AppUpdateModal
    actionButtonLabel={intl.formatMessage(messages.downloadedUpdateButton)}
    closeButton={false}
    actionButtonSize={Size.FixedBig}
    {...props}
  >
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.downloadedUpdateMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={messages.appUpdateTitle}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={messages.downloadedUpdateDescription}
    />
  </AppUpdateModal>
)

export const AppUpdateProgress: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ ...props }) => (
  <ModalDialog
    testId={AppUpdateStepModalTestIds.AppUpdateProgressModal}
    size={ModalSize.Small}
    title={intl.formatMessage(messages.appUpdateTitle)}
    closeButton={false}
    closeable={false}
    {...props}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.progressUpdateTitle}
      />
      <Text
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.progressUpdateDescription}
      />
    </ModalContent>
  </ModalDialog>
)
