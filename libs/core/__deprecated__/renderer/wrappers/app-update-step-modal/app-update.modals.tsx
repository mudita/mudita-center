/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useState } from "react"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import Loader from "Core/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "Core/__deprecated__/renderer/components/core/loader/loader.interface"
import {
  ModalDialog,
  ModalContent,
  ModalContentWithoutMargin,
  RoundIconWrapper,
  ModalMainText,
  ModalLink,
} from "Core/ui/components/modal-dialog"
import { Size } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { AppUpdateStepModalTestIds } from "Core/__deprecated__/renderer/wrappers/app-update-step-modal/app-update-step-modal-test-ids.enum"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import InputCheckboxComponent from "../../components/core/input-checkbox/input-checkbox.component"
import { ipcRenderer } from "electron-better-ipc"
import { useDispatch } from "react-redux"
import { togglePrivacyPolicyAccepted } from "Core/settings/actions"
import { Dispatch } from "../../store"
import styled from "styled-components"
import { BrowserActions } from "Core/__deprecated__/common/enums/browser-actions.enum"

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
  availableUpdateNoVersionMessage: {
    id: "component.updateAvailableModalNoVersionMessage",
  },
  availableUpdateButton: { id: "component.updateAvailableModalButton" },
  availableUpdateCloseButton: {
    id: "component.updateAvailableModalCloseButton",
  },
  availableUpdateDescription: {
    id: "component.updateAvailableModalDescription",
  },
  updateForcedModalMessage: { id: "component.updateForcedModalMessage" },
  updateForcedModalNoVersionMessage: {
    id: "component.updateForcedModalNoVersionMessage",
  },
  updateForcedModalVersion: { id: "component.updateForcedModalVersion" },
  updateForcedModalPrivacyPolicy: {
    id: "component.updateForcedPrivacyPolicy",
  },
  downloadedUpdateMessage: { id: "component.updateDownloadedModalMessage" },
  downloadedUpdateDescription: {
    id: "component.updateDownloadedModalDescription",
  },
  downloadedUpdateButton: { id: "component.updateDownloadedModalButton" },
  errorUpdateMessage: {
    id: "component.updateErrorModalMessage",
  },
  errorUpdateDescription: {
    id: "component.updateErrorModalDescription",
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

const PrivacyPolicyCheckboxWrapper = styled.div`
  display: flex;
`
const StyledLink = styled(ModalLink)`
  font-size: 1.4rem;
`

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
        <Icon type={IconType.Info} width={4.8} />
      </RoundIconWrapper>
      {children}
    </ModalContent>
  </ModalDialog>
)

export const AppUpdateRejected: FunctionComponent<
  ComponentProps<typeof ModalDialog> & AppUpdateAvailableProps
> = ({ appLatestVersion, ...props }) => (
  <AppUpdateModal
    testId={AppUpdateStepModalTestIds.AppUpdateAvailableModal}
    actionButtonLabel={intl.formatMessage(messages.availableUpdateButton)}
    closeButtonLabel={intl.formatMessage(messages.availableUpdateCloseButton)}
    closeButton
    actionButtonSize={Size.FixedSmall}
    {...props}
  >
    <ModalMainText
      displayStyle={TextDisplayStyle.Headline4}
      message={
        appLatestVersion
          ? {
              ...messages.availableUpdateMessage,
              values: { version: appLatestVersion },
            }
          : messages.availableUpdateNoVersionMessage
      }
    />
    <Text
      displayStyle={TextDisplayStyle.Paragraph4}
      color="secondary"
      message={messages.availableUpdateDescription}
    />
  </AppUpdateModal>
)

export const AppUpdatePrivacyPolicy: FunctionComponent<
  ComponentProps<typeof ModalDialog> & AppUpdateForcedProps
> = ({
  appLatestVersion,
  appCurrentVersion,
  onActionButtonClick,
  ...props
}) => {
  const dispatch = useDispatch<Dispatch>()
  const [privacyPolicyCheckboxChecked, setPrivacyPolicyCheckboxChecked] =
    useState(false)
  const openPrivacyPolicyWindow = () =>
    ipcRenderer.callMain(BrowserActions.PolicyOpenBrowser)

  const onPrivacyPolicyCheckboxChange = () => {
    setPrivacyPolicyCheckboxChecked(!privacyPolicyCheckboxChecked)
  }

  const handleActionButtonClick = (): void => {
    void dispatch(togglePrivacyPolicyAccepted(true))
    onActionButtonClick && onActionButtonClick()
  }

  return (
    <ModalDialog
      size={ModalSize.Small}
      title={intl.formatMessage(messages.appUpdateTitle)}
      actionButtonLabel={intl.formatMessage(messages.availableUpdateButton)}
      closeButton={false}
      actionButtonSize={Size.FixedSmall}
      actionButtonDisabled={!privacyPolicyCheckboxChecked}
      onActionButtonClick={handleActionButtonClick}
      {...props}
    >
      <ModalContentWithoutMargin>
        <RoundIconWrapper>
          <Icon type={IconType.MuditaLogo} width={4.8} />
        </RoundIconWrapper>
        <ModalMainText
          displayStyle={TextDisplayStyle.Headline4}
          message={
            appLatestVersion
              ? {
                  ...messages.updateForcedModalMessage,
                  values: { version: appLatestVersion },
                }
              : messages.updateForcedModalNoVersionMessage
          }
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph3}
          message={{
            ...messages.updateForcedModalVersion,
            values: { version: appCurrentVersion },
          }}
          color="secondary"
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph3}
          message={messages.updateForcedModalPrivacyPolicy}
          color="primary"
        />
        <PrivacyPolicyCheckboxWrapper>
          <InputCheckboxComponent
            data-testid="privacy-policy-checkbox"
            checked={privacyPolicyCheckboxChecked}
            onChange={onPrivacyPolicyCheckboxChange}
            label="I have read and agree to the "
          />
          <StyledLink onClick={openPrivacyPolicyWindow}>
            Privacy Policy
          </StyledLink>
        </PrivacyPolicyCheckboxWrapper>
      </ModalContentWithoutMargin>
    </ModalDialog>
  )
}

export const AppUpdateError: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => {
  const openMuditaWebPage = () =>
    ipcRenderer.callMain(BrowserActions.UpdateOpenBrowser)
  return (
    <AppUpdateModal
      testId={AppUpdateStepModalTestIds.AppUpdateErrorModal}
      {...props}
    >
      <Text
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.errorUpdateMessage}
      />
      <Text
        displayStyle={TextDisplayStyle.Paragraph4}
        color="secondary"
        message={{
          ...messages.errorUpdateDescription,
          values: {
            link: <ModalLink onClick={openMuditaWebPage}>mudita.com</ModalLink>,
          },
        }}
      />
    </AppUpdateModal>
  )
}

export const AppUpdateDownloaded: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => (
  <AppUpdateModal
    actionButtonLabel={intl.formatMessage(messages.downloadedUpdateButton)}
    closeButton={false}
    actionButtonSize={Size.FixedBig}
    {...props}
  >
    <ModalMainText
      displayStyle={TextDisplayStyle.Headline4}
      message={messages.downloadedUpdateMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.Paragraph4}
      color="secondary"
      message={messages.appUpdateTitle}
    />
    <Text
      displayStyle={TextDisplayStyle.Paragraph4}
      color="secondary"
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
      <ModalMainText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.progressUpdateTitle}
      />
      <Text
        displayStyle={TextDisplayStyle.Paragraph4}
        color="secondary"
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
    <ModalMainText
      displayStyle={TextDisplayStyle.Headline4}
      message={messages.notAvailableUpdateMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.Paragraph4}
      message={{
        ...messages.notAvailableUpdateDescription,
        values: { version: appCurrentVersion },
      }}
      color="secondary"
    />
  </AppUpdateModal>
)
