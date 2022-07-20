/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Modal, {
  ModalProps,
} from "App/__deprecated__/renderer/components/core/modal/modal.component"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import React, { ComponentProps } from "react"
import styled from "styled-components"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import {
  backgroundColor,
  borderRadius,
  transitionTime,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { DownloadProgress } from "App/__deprecated__/renderer/interfaces/file-download.interface"
import { convertBytes } from "App/__deprecated__/renderer/utils/convert-bytes"
import { defineMessages, FormattedMessage } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import formatDuration from "App/__deprecated__/renderer/utils/format-duration"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import {
  ErrorDataModal,
  ErrorWithRetryDataModal,
  LoadingStateDataModal,
} from "App/__deprecated__/renderer/components/rest/data-modal/data.modals"
import { OverviewModalsTestIds } from "App/overview/components/overview-modals-test-ids.enum"
import Loader from "App/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "App/__deprecated__/renderer/components/core/loader/loader.interface"
import {
  ModalDialog,
  RoundIconWrapper,
  ModalMainText,
} from "App/ui/components/modal-dialog"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { DeviceType } from "@mudita/pure"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p + p {
    margin-top: 1.2rem;
  }
`

const DownloadBar = styled.div`
  width: 22rem;
  margin-top: 3.2rem;
  height: 0.4rem;
  position: relative;
  border-radius: ${borderRadius("medium")};
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
    id: "module.overview.updateNotAvailableDescription",
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
  updatingFlatBatteryPureTitle: {
    id: "module.overview.updatingFlatBatteryPureTitle",
  },
  updatingFlatBatteryPureDescription: {
    id: "module.overview.updatingFlatBatteryPureDescription",
  },
  updatingFlatBatteryActionButton: {
    id: "module.overview.updatingFlatBatteryActionButton",
  },
  updatingFlatBatteryHarmonyTitle: {
    id: "module.overview.updatingFlatBatteryHarmonyTitle",
  },
  updatingFlatBatteryHarmonyDescription: {
    id: "module.overview.updatingFlatBatteryHarmonyDescription",
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
    actionButtonSize={Size.FixedSmall}
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
      <Icon type={IconType.Pure} width={4} />
    </RoundIconWrapper>
    <ModalMainText
      displayStyle={TextDisplayStyle.Headline4}
      message={messages.updateAvailableMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.Paragraph4}
      color="secondary"
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

export const UpdateNotAvailable = ({ version = "" }) => (
  <OSUpdateModal>
    <RoundIconWrapper>
      <Icon type={IconType.Pure} width={4} />
    </RoundIconWrapper>
    <ModalMainText
      displayStyle={TextDisplayStyle.Headline4}
      message={messages.updateNotAvailableMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.Paragraph4}
      color="secondary"
      message={{
        ...messages.updateNotAvailableDescription,
        values: {
          version,
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
        <Icon type={IconType.Download} width={4} />
      </RoundIconWrapper>
      <ModalMainText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.downloadingUpdateMessage}
      />
      <Text displayStyle={TextDisplayStyle.Paragraph4} color="secondary">
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
    data-testid={OverviewModalsTestIds.DownloadingUpdateFinishedModal}
  >
    <RoundIconWrapper>
      <Icon type={IconType.Download} width={4} />
    </RoundIconWrapper>
    <ModalMainText
      displayStyle={TextDisplayStyle.Headline4}
      message={messages.downloadCompletedMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.Paragraph4}
      color="secondary"
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

// FIXME: I'm deprecated, please use component from overview.modal-dialogs.tsx
export const UpdatingSpinnerModal: FunctionComponent = () => {
  return (
    <OSUpdateModal closeButton={false} closeable={false}>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} size={6} />
      </RoundIconWrapper>
      <ModalMainText
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.updatingProgressTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.Paragraph4}
        color="secondary"
        message={messages.updatingProgressDescription}
      />
    </OSUpdateModal>
  )
}

// FIXME: I'm deprecated, please use component from overview.modal-dialogs.tsx
export const UpdatingSuccessModal = () => (
  <OSUpdateModal data-testid={OverviewModalsTestIds.UpdatingSuccessModal}>
    <RoundIconWrapper>
      <Icon type={IconType.Pure} width={4} />
    </RoundIconWrapper>
    <ModalMainText
      displayStyle={TextDisplayStyle.Headline4}
      message={messages.updatingSuccessTitle}
    />
    <ModalText
      displayStyle={TextDisplayStyle.Paragraph4}
      color="secondary"
      message={messages.updatingSuccessDescription}
    />
  </OSUpdateModal>
)

// FIXME: I'm deprecated, please use component from overview.modal-dialogs.tsx
export const UpdatingFailureModal = ({
  code,
  onContact,
}: {
  code?: number
  onContact: (code?: number) => void
}) => {
  const handleOnActionButtonClick = (): void => {
    onContact(code)
  }

  return (
    <ErrorDataModal
      closeButton={false}
      onActionButtonClick={handleOnActionButtonClick}
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      actionButtonLabel={intl.formatMessage(
        messages.updatingFailedSupportButton
      )}
      textMessage={{ ...messages.updatingFailedTitle, values: { code } }}
      descriptionMessage={messages.updatingFailedOnlySupportDescription}
    />
  )
}

// FIXME: I'm deprecated, please use component from overview.modal-dialogs.tsx
export const UpdatingFailureWithHelpModal = ({
  onContact,
  onHelp,
}: {
  onHelp: () => void
  onContact: () => void
}) => {
  return (
    <ErrorDataModal
      closeButton
      onCloseButton={onContact}
      closeButtonLabel={intl.formatMessage(
        messages.updatingFailedSupportButton
      )}
      onActionButtonClick={onHelp}
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      actionButtonLabel={intl.formatMessage(messages.updatingFailedHelpButton)}
      textMessage={{ ...messages.updatingFailedTitle }}
      descriptionMessage={messages.updatingFailedDescription}
    />
  )
}

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
        <Icon type={IconType.Pure} width={4} />
      </RoundIconWrapper>
      <ModalMainText displayStyle={TextDisplayStyle.Headline4}>
        {install ? "Installing" : "Downloading"}. Are you sure?
      </ModalMainText>
      <CenteredText displayStyle={TextDisplayStyle.Paragraph3}>
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
interface TooLowBatteryModalProps extends ComponentProps<typeof ModalDialog> {
  closeModal?: () => void
  deviceType?: DeviceType
}

export const TooLowBatteryModal: FunctionComponent<TooLowBatteryModalProps> = ({
  deviceType,
  ...props
}) => {
  return (
    <OSUpdateModal
      closeButtonLabel={intl.formatMessage(
        messages.updatingFlatBatteryActionButton
      )}
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      size={ModalSize.Small}
      {...props}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.NoBattery} width={5} />
        </RoundIconWrapper>
        {deviceType === DeviceType.MuditaPure ? (
          <>
            <ModalText displayStyle={TextDisplayStyle.Headline4}>
              {intl.formatMessage(messages.updatingFlatBatteryPureTitle)}
            </ModalText>
            <ModalText
              displayStyle={TextDisplayStyle.Paragraph4}
              color="secondary"
            >
              {intl.formatMessage(messages.updatingFlatBatteryPureDescription)}
            </ModalText>
          </>
        ) : (
          <>
            <ModalText displayStyle={TextDisplayStyle.Headline4}>
              {intl.formatMessage(messages.updatingFlatBatteryHarmonyTitle)}
            </ModalText>
            <ModalText
              displayStyle={TextDisplayStyle.Paragraph4}
              color="secondary"
            >
              {intl.formatMessage(
                messages.updatingFlatBatteryHarmonyDescription
              )}
            </ModalText>
          </>
        )}
      </ModalContent>
    </OSUpdateModal>
  )
}
