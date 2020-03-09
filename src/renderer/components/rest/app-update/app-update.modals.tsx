import React from "react"
import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4.8rem 0;

  p + p {
    margin-top: 1.2rem;
  }

  & + * {
    margin-bottom: 2.8rem;
  }
`

const RoundIconWrapper = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  background-color: ${backgroundColor("lightBlue")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.2rem;
`

const messages = defineMessages({
  appUpdateTitle: { id: "app.update.modal.title" },
  availableUpdateMessage: { id: "app.update.available.modal.message" },
  availableUpdateButton: { id: "app.update.available.modal.button" },
  downloadedUpdateMessage: { id: "app.update.downloaded.modal.message" },
  downloadedUpdateDescription: {
    id: "app.update.downloaded.modal.description",
  },
  downloadedUpdateButton: { id: "app.update.downloaded.modal.button" },
  downloadedUpdateCloseButton: {
    id: "app.update.downloaded.modal.closeButton",
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
}) => {
  return (
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
}

export const AppUpdateDownloaded: FunctionComponent<DownloadedAppUpdateInterface> = ({
  onInstall = noop,
}) => {
  return (
    <AppUpdateModal
      onActionButtonClick={onInstall}
      actionButtonLabel={intl.formatMessage(messages.downloadedUpdateButton)}
      closeButtonLabel={intl.formatMessage(
        messages.downloadedUpdateCloseButton
      )}
    >
      <Text
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.downloadedUpdateMessage}
      />
      <Text
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.downloadedUpdateDescription}
      />
    </AppUpdateModal>
  )
}
