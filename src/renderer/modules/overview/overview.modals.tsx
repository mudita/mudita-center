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
import { ModalText } from "Renderer/components/rest/sync-modals/sync-contacts.styled"
import {
  ErrorDataModal,
  ErrorWithRetryDataModal,
  LoadingStateDataModal,
} from "Renderer/components/rest/data-modal/data.modals"
import { LoadingBar } from "Renderer/modules/overview/backup-process/modals.styled"
import theme from "Renderer/styles/theming/theme"
import { DisplayStyle } from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"

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

const ProgressText = styled(ModalText)`
  margin-bottom: 6.8rem;
`

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "view.name.overview.system.modal.muditaOsUpdate.title",
  },
  checkingForUpdatesMessage: {
    id: "view.name.overview.system.modal.checkingForUpdates.message",
  },
  checkingForUpdatesCloseButton: {
    id: "view.name.overview.system.modal.checkingForUpdates.closeButton",
  },
  updateAvailableMessage: {
    id: "view.name.overview.system.modal.updateAvailable.message",
  },
  updateAvailableDescription: {
    id: "view.name.overview.system.modal.updateAvailable.description",
  },
  updateAvailableButton: {
    id: "view.name.overview.system.modal.updateAvailable.button",
  },
  updateNotAvailableMessage: {
    id: "view.name.overview.system.modal.updateNotAvailable.message",
  },
  updateNotAvailableDescription: {
    id: "view.name.overview.system.modal.updateNotAvailable.description",
  },
  downloadingUpdateMessage: {
    id: "view.name.overview.system.modal.downloadingUpdate.message",
  },
  downloadingUpdateDescriptionStarting: {
    id:
      "view.name.overview.system.modal.downloadingUpdate.description.starting",
  },
  downloadingUpdateDescriptionDownloading: {
    id:
      "view.name.overview.system.modal.downloadingUpdate.description.downloading",
  },
  downloadingUpdateDescriptionFinishing: {
    id:
      "view.name.overview.system.modal.downloadingUpdate.description.finishing",
  },
  downloadingUpdateButton: {
    id: "view.name.overview.system.modal.downloadingUpdate.button",
  },
  downloadCompletedMessage: {
    id: "view.name.overview.system.modal.downloadCompleted.message",
  },
  downloadCompletedDescription: {
    id: "view.name.overview.system.modal.downloadCompleted.description",
  },
  downloadCompletedButton: {
    id: "view.name.overview.system.modal.downloadCompleted.button",
  },
  downloadCompletedCloseButton: {
    id: "view.name.overview.system.modal.downloadCompleted.closeButton",
  },
  checkingUpdateFailedMessage: {
    id: "view.name.overview.system.modal.checkingUpdateFailed.message",
  },
  checkingUpdateFailedDescription: {
    id: "view.name.overview.system.modal.checkingUpdateFailed.description",
  },
  checkingUpdateFailedButton: {
    id: "view.name.overview.system.modal.checkingUpdateFailed.button",
  },
  downloadingFailedMessage: {
    id: "view.name.overview.system.modal.downloadingFailed.message",
  },
  downloadingFailedDescription: {
    id: "view.name.overview.system.modal.downloadingFailed.description",
  },
  downloadingFailedButton: {
    id: "view.name.overview.system.modal.downloadingFailed.button",
  },
  downloadingCancelledMessage: {
    id: "view.name.overview.system.modal.downloadingCancelled.message",
  },
  updatingProgressTitle: {
    id: "view.name.overview.system.modal.updating.progress.title",
  },
  updatingProgressDescription: {
    id: "view.name.overview.system.modal.updating.progress.description",
  },
  updatingSuccessTitle: {
    id: "view.name.overview.system.modal.updating.success.title",
  },
  updatingSuccessDescription: {
    id: "view.name.overview.system.modal.updating.success.description",
  },
  updatingFailedTitle: {
    id: "view.name.overview.system.modal.updating.fail.title",
  },
  updatingFailedDescription: {
    id: "view.name.overview.system.modal.updating.fail.description",
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

export const UpdatingProgressModal: FunctionComponent<{
  progressValue: number
}> = ({ progressValue }) => {
  const value = progressValue * 100

  return (
    <OSUpdateModal closeButton={false} closeable={false}>
      <RoundIconWrapper>
        <Icon type={Type.MuditaDarkLogo} width={8} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.updatingProgressTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.updatingProgressDescription}
      />
      <LoadingBar
        chartData={[
          {
            value,
            color: backgroundColor("chartBar")({ theme }),
          },
          {
            value: 100 - value,
            color: backgroundColor("minor")({ theme }),
          },
        ]}
        displayStyle={DisplayStyle.Thin}
      />

      <ProgressText displayStyle={TextDisplayStyle.MediumLightText}>
        {value}%
      </ProgressText>
    </OSUpdateModal>
  )
}

export const UpdatingSuccessModal = () => (
  <OSUpdateModal>
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

export const UpdatingFailureModal = ({ onRetry = noop }) => (
  <ErrorWithRetryDataModal
    onRetry={onRetry}
    title={intl.formatMessage(messages.muditaOsUpdateTitle)}
    textMessage={messages.updatingFailedTitle}
    descriptionMessage={messages.updatingFailedDescription}
  />
)
