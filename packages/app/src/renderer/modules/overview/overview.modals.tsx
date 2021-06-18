/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import styled from "styled-components"
import { noop } from "Renderer/utils/noop"
import {
  backgroundColor,
  transitionTime,
} from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { DownloadProgress } from "Renderer/interfaces/file-download.interface"
import { convertBytes } from "Renderer/utils/convert-bytes"
import { defineMessages, FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import formatDuration from "Renderer/utils/format-duration"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import {
  ErrorDataModal,
  ErrorWithRetryDataModal,
  LoadingStateDataModal,
} from "Renderer/components/rest/data-modal/data.modals"
import { OverviewTestIds } from "Renderer/modules/overview/overview-test-ids.enum"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p + p {
    margin-top: 1.2rem;
  }
`

export const RoundIconWrapper = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  background-color: ${backgroundColor("icon")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.2rem;
`

const DownloadBar = styled.div`
  width: 22rem;
  margin-top: 3.2rem;
  height: 0.4rem;
  position: relative;
  border-radius: 0.4rem;
  background-color: ${backgroundColor("minor")};

  span {
    display: block;
    height: inherit;
    border-radius: inherit;
    background-color: ${backgroundColor("activity")};
    transition: width ${transitionTime("faster")} ease-in-out;
  }
`

const CenteredText = styled(Text)`
  text-align: center;
  line-height: 1.3em;
`

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  checkingForUpdatesMessage: {
    id: "module.overview.checkingForUpdatesMessage",
  },
  checkingForUpdatesCloseButton: {
    id: "module.overview.checkingForUpdatesCloseButton",
  },
  updateAvailableMessage: {
    id: "module.overview.updateAvailableMessage",
  },
  updateAvailableDescription: {
    id: "module.overview.updateAvailableDescription",
  },
  updateAvailableButton: {
    id: "module.overview.updateAvailableButton",
  },
  updateNotAvailableMessage: {
    id: "module.overview.updateNotAvailableMessage",
  },
  updateNotAvailableDescription: {
    id: "module.overview.updateAvailableDescription",
  },
  downloadingUpdateMessage: {
    id: "module.overview.downloadingUpdateMessage",
  },
  downloadingUpdateDescriptionStarting: {
    id: "module.overview.downloadingUpdateStarting",
  },
  downloadingUpdateDescriptionDownloading: {
    id: "module.overview.downloadingUpdateDownloading",
  },
  downloadingUpdateDescriptionFinishing: {
    id: "module.overview.downloadingUpdateFinishing",
  },
  downloadingUpdateButton: {
    id: "module.overview.downloadingUpdateButton",
  },
  downloadCompletedMessage: {
    id: "module.overview.downloadCompletedMessage",
  },
  downloadCompletedDescription: {
    id: "module.overview.downloadCompletedDescription",
  },
  downloadCompletedButton: {
    id: "module.overview.downloadCompletedButton",
  },
  downloadCompletedCloseButton: {
    id: "module.overview.downloadCompletedCloseButton",
  },
  checkingUpdateFailedMessage: {
    id: "module.overview.checkingUpdateFailedMessage",
  },
  checkingUpdateFailedDescription: {
    id: "module.overview.checkingUpdateFailedDescription",
  },
  checkingUpdateFailedButton: {
    id: "module.overview.checkingUpdateFailedButton",
  },
  downloadingFailedMessage: {
    id: "module.overview.downloadingFailedMessage",
  },
  downloadingFailedDescription: {
    id: "module.overview.downloadingFailedDescription",
  },
  downloadingFailedButton: {
    id: "module.overview.downloadingFailedButton",
  },
  downloadingCancelledMessage: {
    id: "module.overview.downloadingCancelledMessage",
  },
  updatingProgressTitle: {
    id: "module.overview.updatingProgressTitle",
  },
  updatingProgressDescription: {
    id: "module.overview.updatingProgressDescription",
  },
  updatingSuccessTitle: {
    id: "module.overview.updatingSuccessTitle",
  },
  updatingSuccessDescription: {
    id: "module.overview.updatingSuccessDescription",
  },
  updatingFailedTitle: {
    id: "module.overview.updatingFailedTitle",
  },
  updatingFailedDescription: {
    id: "module.overview.updatingFailedDescription",
  },
  updatingFailedOnlySupportDescription: {
    id: "module.overview.updatingFailedOnlySupportDescription",
  },
  updatingFailedSupportButton: {
    id: "module.overview.updatingFailedSupportButton",
  },
  updatingFailedHelpButton: {
    id: "module.overview.updatingFailedHelpButton",
  },
})

const OSUpdateModal: FunctionComponent<Partial<ModalProps>> = ({
  children,
  size = ModalSize.Small,
  ...props
}) => (
  <Modal
    size={size}
    title={intl.formatMessage(messages.muditaOsUpdateTitle)}
    {...props}
  >
    <ModalContent>{children}</ModalContent>
  </Modal>
)

export const CheckingUpdatesModal = () => (
  <LoadingStateDataModal
    title={intl.formatMessage(messages.muditaOsUpdateTitle)}
    textMessage={messages.checkingForUpdatesMessage}
  />
)

export const UpdateAvailable = ({
  onDownload = noop,
  version = "",
  date = "",
}) => (
  <OSUpdateModal
    actionButtonLabel={intl.formatMessage(messages.updateAvailableButton)}
    onActionButtonClick={onDownload}
    closeButton={false}
  >
    <RoundIconWrapper>
      <Icon type={Type.Pure} width={4} />
    </RoundIconWrapper>
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.updateAvailableMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={{
        ...messages.updateAvailableDescription,
        values: {
          version,
          date: new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        },
      }}
    />
  </OSUpdateModal>
)

export const UpdateNotAvailable = ({ version = "", date = "" }) => (
  <OSUpdateModal>
    <RoundIconWrapper>
      <Icon type={Type.Pure} width={4} />
    </RoundIconWrapper>
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.updateNotAvailableMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={{
        ...messages.updateNotAvailableDescription,
        values: {
          version,
          date: new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        },
      }}
    />
  </OSUpdateModal>
)

export const UpdateServerError = ({ onRetry = noop }) => (
  <ErrorWithRetryDataModal
    onRetry={onRetry}
    title={intl.formatMessage(messages.muditaOsUpdateTitle)}
    textMessage={messages.checkingUpdateFailedMessage}
    descriptionMessage={messages.checkingUpdateFailedDescription}
  />
)

export const DownloadingUpdateModal = ({
  percent = 0,
  speed = 0,
  timeLeft,
  onCancel = noop,
}: Partial<DownloadProgress & { onCancel: () => void }>) => {
  const starting = (
    <FormattedMessage {...messages.downloadingUpdateDescriptionStarting} />
  )
  const downloading = (
    <FormattedMessage
      {...messages.downloadingUpdateDescriptionDownloading}
      values={{
        speed: convertBytes(speed) + "/s",
        timeLeft: formatDuration(timeLeft || 0),
      }}
    />
  )
  const finishing = (
    <FormattedMessage {...messages.downloadingUpdateDescriptionFinishing} />
  )
  return (
    <OSUpdateModal
      closeable={false}
      closeButton={false}
      actionButtonLabel={intl.formatMessage(messages.downloadingUpdateButton)}
      onActionButtonClick={onCancel}
    >
      <RoundIconWrapper>
        <Icon type={Type.Download} width={4} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.downloadingUpdateMessage}
      />
      <Text displayStyle={TextDisplayStyle.MediumFadedText}>
        {timeLeft === undefined
          ? starting
          : timeLeft < 1
          ? finishing
          : downloading}
      </Text>
      <DownloadBar>
        <span style={{ width: `${percent}%` }} />
      </DownloadBar>
    </OSUpdateModal>
  )
}

export const DownloadingUpdateFinishedModal = ({ onOsUpdate = noop }) => (
  <OSUpdateModal
    actionButtonLabel={intl.formatMessage(messages.downloadCompletedButton)}
    closeButtonLabel={intl.formatMessage(messages.downloadCompletedCloseButton)}
    onActionButtonClick={onOsUpdate}
    data-testid={OverviewTestIds.DownloadingUpdateFinishedModal}
  >
    <RoundIconWrapper>
      <Icon type={Type.Download} width={4} />
    </RoundIconWrapper>
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.downloadCompletedMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={messages.downloadCompletedDescription}
    />
  </OSUpdateModal>
)

export const DownloadingUpdateCancelledModal = () => (
  <ErrorDataModal
    title={intl.formatMessage(messages.muditaOsUpdateTitle)}
    textMessage={messages.downloadingCancelledMessage}
  />
)

export const DownloadingUpdateInterruptedModal = ({ onRetry = noop }) => (
  <ErrorWithRetryDataModal
    onRetry={onRetry}
    title={intl.formatMessage(messages.muditaOsUpdateTitle)}
    textMessage={messages.downloadingFailedMessage}
    descriptionMessage={messages.downloadingFailedDescription}
  />
)

export const UpdatingSpinnerModal: FunctionComponent = () => {
  return (
    <OSUpdateModal closeButton={false} closeable={false}>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} size={6} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.updatingProgressTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.updatingProgressDescription}
      />
    </OSUpdateModal>
  )
}

export const UpdatingSuccessModal = () => (
  <OSUpdateModal data-testid={OverviewTestIds.UpdatingSuccessModal}>
    <RoundIconWrapper>
      <Icon type={Type.Pure} width={4} />
    </RoundIconWrapper>
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.updatingSuccessTitle}
    />
    <ModalText
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={messages.updatingSuccessDescription}
    />
  </OSUpdateModal>
)

export const UpdatingFailureModal = ({
  code,
  onContact,
}: {
  code?: number
  onContact: () => void
}) => (
  <ErrorDataModal
    closeButton={false}
    onActionButtonClick={onContact}
    title={intl.formatMessage(messages.muditaOsUpdateTitle)}
    actionButtonLabel={intl.formatMessage(messages.updatingFailedSupportButton)}
    textMessage={{ ...messages.updatingFailedTitle, values: { code } }}
    descriptionMessage={messages.updatingFailedOnlySupportDescription}
  />
)

export const UpdatingFailureWithHelpModal = ({
  code,
  onContact,
  onHelp,
}: {
  code: number
  onHelp: () => void
  onContact: () => void
}) => (
  <ErrorDataModal
    closeButton
    onCloseButton={onContact}
    closeButtonLabel={intl.formatMessage(messages.updatingFailedSupportButton)}
    onActionButtonClick={onHelp}
    title={intl.formatMessage(messages.muditaOsUpdateTitle)}
    actionButtonLabel={intl.formatMessage(messages.updatingFailedHelpButton)}
    textMessage={{ ...messages.updatingFailedTitle, values: { code } }}
    descriptionMessage={messages.updatingFailedDescription}
  />
)

export const DevUpdate = ({
  action = noop,
  install = false,
  version = "",
  date = "",
  prerelease = false,
}) => {
  const textDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
  return (
    <OSUpdateModal
      actionButtonLabel={install ? "Install now" : "Download now"}
      onActionButtonClick={action}
      closeButton={false}
    >
      <RoundIconWrapper>
        <Icon type={Type.Pure} width={4} />
      </RoundIconWrapper>
      <Text displayStyle={TextDisplayStyle.LargeBoldText}>
        {install ? "Installing" : "Downloading"}. Are you sure?
      </Text>
      <CenteredText displayStyle={TextDisplayStyle.MediumText}>
        You're about to {install ? "install" : "download"} an update that{" "}
        {prerelease ? (
          <span>may be unstable</span>
        ) : (
          <span>may be incompatible with the current OS version</span>
        )}
        .<br />
        <br />
        Selected version: <strong>{version}</strong> (
        <strong>{textDate}</strong>).
        <br />
        <br />
        Please make sure you know what you're doing!
      </CenteredText>
    </OSUpdateModal>
  )
}
