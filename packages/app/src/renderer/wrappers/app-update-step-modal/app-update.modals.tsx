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
  ModalContentWithoutMargin,
  RoundIconWrapper,
} from "Renderer/components/core/modal-dialog/modal-dialog-shared"
import { Size } from "Renderer/components/core/button/button.config"
import { AppUpdateStepModalTestIds } from "Renderer/wrappers/app-update-step-modal/app-update-step-modal-test-ids.enum"

export interface AppUpdateAvailableProps {
  appLatestVersion?: string
}

export interface AppUpdateNotAvailableProps {
  appCurrentVersion?: string
}

export interface AppUpdateForcedProps {
  appLatestVersion?: string
  appCurrentVersion?: string
}

const messages = defineMessages({
  appUpdateTitle: { id: "component.updateModalTitle" },
  availableUpdateMessage: { id: "component.updateAvailableModalMessage" },
  availableUpdateAppVersion: { id: "component.updateAvailableModalVersion" },
  availableUpdateButton: { id: "component.updateAvailableModalButton" },
  availableUpdateDescription: {
    id: "component.updateAvailableModalDescription",
  },
  updateForcedModalMessage: { id: "component.updateForcedModalMessage" },
  updateForcedModalVersion: { id: "component.updateForcedModalVersion" },
  updateForcedModalDescription: {
    id: "component.updateForcedModalDescription",
  },
  updateForcedModalCurrentVersion: {
    id: "component.updateForcedModalCurrentVersion",
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
  notAvailableUpdateMessage: {
    id: "component.updateNotAvailableMessage",
  },
  notAvailableUpdateDescription: {
    id: "component.updateNotAvailableDescription",
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
      displayStyle={TextDisplayStyle.QuaternaryHeading}
      message={messages.availableUpdateMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.LightText}
      message={{
        ...messages.availableUpdateAppVersion,
        values: { version: appLatestVersion },
      }}
      color="secondary"
    />
    <Text
      displayStyle={TextDisplayStyle.LightText}
      message={messages.availableUpdateDescription}
    />
  </AppUpdateModal>
)

export const AppUpdateForced: FunctionComponent<
  ComponentProps<typeof ModalDialog> & AppUpdateForcedProps
> = ({ appLatestVersion, appCurrentVersion, ...props }) => (
  <ModalDialog
    size={ModalSize.Small}
    title={intl.formatMessage(messages.appUpdateTitle)}
    actionButtonLabel={intl.formatMessage(messages.availableUpdateButton)}
    closeButton={false}
    actionButtonSize={Size.FixedBig}
    {...props}
  >
    <ModalContentWithoutMargin>
      <RoundIconWrapper>
        <Icon type={Type.Pure} width={4} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.QuaternaryHeading}
        message={messages.updateForcedModalMessage}
      />
      <br />
      <Text
        displayStyle={TextDisplayStyle.LightText}
        message={{
          ...messages.updateForcedModalVersion,
          values: { version: appLatestVersion },
        }}
        color="secondary"
      />
      <Text
        displayStyle={TextDisplayStyle.MediumText}
        message={messages.updateForcedModalDescription}
      />
      <Text
        displayStyle={TextDisplayStyle.LightText}
        message={{
          ...messages.updateForcedModalCurrentVersion,
          values: { version: appCurrentVersion },
        }}
        color="secondary"
      />
    </ModalContentWithoutMargin>
  </ModalDialog>
)

export const AppUpdateError: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => (
  <AppUpdateModal
    testId={AppUpdateStepModalTestIds.AppUpdateErrorModal}
    {...props}
  >
    <Text
      displayStyle={TextDisplayStyle.QuaternaryHeading}
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
      displayStyle={TextDisplayStyle.QuaternaryHeading}
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
        displayStyle={TextDisplayStyle.QuaternaryHeading}
        message={messages.progressUpdateTitle}
      />
      <Text
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.progressUpdateDescription}
      />
    </ModalContent>
  </ModalDialog>
)

export const AppUpdateNotAvailable: FunctionComponent<
  ComponentProps<typeof ModalDialog> & AppUpdateNotAvailableProps
> = ({ appCurrentVersion, ...props }) => (
  <AppUpdateModal
    testId={AppUpdateStepModalTestIds.AppUpdateNotAvailableModal}
    closeButton={false}
    {...props}
  >
    <Text
      displayStyle={TextDisplayStyle.QuaternaryHeading}
      message={messages.notAvailableUpdateMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.LightText}
      message={{
        ...messages.notAvailableUpdateDescription,
        values: { version: appCurrentVersion },
      }}
      color="secondary"
    />
  </AppUpdateModal>
)
