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
} from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"

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

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "view.name.phone.modal.errorWithRetry.title",
  },
  checkingUpdateFailedButton: {
    id: "view.name.phone.modal.errorWithRetry.button",
  },

  checkingUpdateFailedMessage: {
    id: "view.name.phone.modal.errorWithRetry.message",
  },

  checkingUpdateFailedDescription: {
    id: "view.name.phone.modal.errorWithRetry.description",
  },
  downloadingCancelledMessage: {
    id: "view.name.phone.modal.errorWithRetry.description",
  },
})

const ErrorModal: FunctionComponent<Partial<ModalProps>> = ({
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

export const ContactErrorWithRetry = ({ onRetry = noop }) => (
  <ErrorModal
    actionButtonLabel={intl.formatMessage(messages.checkingUpdateFailedButton)}
    onActionButtonClick={onRetry}
  >
    <RoundIconWrapper>
      <Icon type={Type.Fail} width={4} />
    </RoundIconWrapper>
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.checkingUpdateFailedMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={messages.checkingUpdateFailedDescription}
    />
  </ErrorModal>
)
export const ContactError = () => (
  <ErrorModal
    actionButtonLabel={intl.formatMessage(messages.checkingUpdateFailedButton)}
  >
    <RoundIconWrapper>
      <Icon type={Type.Fail} width={4} />
    </RoundIconWrapper>
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={messages.downloadingCancelledMessage}
    />
  </ErrorModal>
)
