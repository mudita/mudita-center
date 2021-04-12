/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  AvailableAppUpdateInterface,
  DownloadedAppUpdateInterface,
} from "Renderer/components/rest/app-update/app-update.interface"
import { noop } from "Renderer/utils/noop"

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    line-height: 1.4;
    white-space: pre-wrap;
  }

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

const messages = defineMessages({
  appUpdateTitle: { id: "component.modal.update.title" },
  availableUpdateMessage: { id: "component.modal.updateAvailable.message" },
  availableUpdateButton: { id: "component.modal.updateAvailable.button" },
  downloadedUpdateMessage: { id: "component.modal.updateDownloaded.message" },
  downloadedUpdateDescription: {
    id: "component.modal.updateDownloaded.description",
  },
  downloadedUpdateWarning: {
    id: "component.modal.updateDownloaded.warning",
  },
  downloadedUpdateButton: { id: "component.modal.updateDownloaded.button" },
  downloadedUpdateCloseButton: {
    id: "component.modal.updateDownloaded.closeButton",
  },
  errorUpdateMessage: {
    id: "component.modal.updateError.message",
  },
  errorUpdateDescription: {
    id: "component.modal.updateError.description",
  },
})

const AppUpdateModal: FunctionComponent<Partial<ModalProps>> = ({
  children,
  ...props
}) => (
  <Modal
    size={ModalSize.Small}
    title={intl.formatMessage(messages.appUpdateTitle)}
    {...props}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={Type.MuditaLogo} width={4} />
      </RoundIconWrapper>
      {children}
    </ModalContent>
  </Modal>
)

export const AppUpdateAvailable: FunctionComponent<AvailableAppUpdateInterface> = ({
  onDownload = noop,
}) => (
  <AppUpdateModal
    onActionButtonClick={onDownload}
    actionButtonLabel={intl.formatMessage(messages.availableUpdateButton)}
  >
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.availableUpdateMessage}
    />
  </AppUpdateModal>
)

export const AppUpdateError: FunctionComponent = () => (
  <AppUpdateModal>
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

export const AppUpdateDownloaded: FunctionComponent<DownloadedAppUpdateInterface> = ({
  onInstall = noop,
}) => (
  <AppUpdateModal
    onActionButtonClick={onInstall}
    actionButtonLabel={intl.formatMessage(messages.downloadedUpdateButton)}
    closeButtonLabel={intl.formatMessage(messages.downloadedUpdateCloseButton)}
  >
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.downloadedUpdateMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={messages.downloadedUpdateDescription}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumBoldText}
      message={{
        ...messages.downloadedUpdateWarning,
        values: {
          // On macOS the app can't automatically start after update (so it just quits),
          // while linux and windows supports that feature (so the app restarts in fact).
          // That's why there must be a distinction in translation depending on current OS.
          osxPlatform: process?.platform === "darwin",
        },
      }}
    />
  </AppUpdateModal>
)
