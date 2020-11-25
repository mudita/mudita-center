import { defineMessages } from "react-intl"
import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import React from "react"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import { intl } from "Renderer/utils/intl"
import { Message } from "Renderer/interfaces/message.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { noop } from "Renderer/utils/noop"
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
const messages = defineMessages({
  errorTitle: { id: "component.modal.data.error.title" },
  errorText: { id: "component.modal.data.error.text" },
  errorDescription: { id: "component.modal.data.error.description" },
  errorWithRetryButton: { id: "component.modal.data.errorWithRetry.button" },
  loadingTitle: { id: "component.modal.data.loading.title" },
})

const ErrorModal: FunctionComponent<Partial<ModalProps>> = ({
  children,
  size = ModalSize.Small,
  ...props
}) => (
  <Modal size={size} {...props}>
    <ModalContent>{children}</ModalContent>
  </Modal>
)

export const ErrorDataModal = ({
  onClose = noop,
  title = intl.formatMessage(messages.errorTitle),
  textMessage = messages.errorText,
}) => (
  <ErrorModal title={title} onClose={onClose}>
    <RoundIconWrapper>
      <Icon type={Type.Fail} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText} message={textMessage} />
  </ErrorModal>
)

export const ErrorWithRetryDataModal = ({
  onRetry,
  title = intl.formatMessage(messages.errorTitle),
  textMessage = messages.errorText,
  descriptionMessage = messages.errorDescription,
}: {
  onRetry: () => void
  title?: string
  textMessage?: Message
  descriptionMessage?: Message
}) => (
  <ErrorModal
    title={title}
    onActionButtonClick={onRetry}
    actionButtonLabel={intl.formatMessage(messages.errorWithRetryButton)}
  >
    <RoundIconWrapper>
      <Icon type={Type.Fail} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.LargeBoldText} message={textMessage} />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={descriptionMessage}
    />
  </ErrorModal>
)

export const LoadingStateDataModal = ({
  title = intl.formatMessage(messages.loadingTitle),
  textMessage,
}: {
  title?: string
  textMessage?: Message
}) => (
  <ErrorModal closeButton={false} title={title}>
    <RoundIconWrapper>
      <Loader type={LoaderType.Spinner} />
    </RoundIconWrapper>
    {textMessage && (
      <Text
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={textMessage}
      />
    )}
  </ErrorModal>
)
