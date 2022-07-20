/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Modal, {
  ModalProps,
} from "App/__deprecated__/renderer/components/core/modal/modal.component"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import React from "react"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { Message } from "App/__deprecated__/renderer/interfaces/message.interface"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import Loader from "App/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "App/__deprecated__/renderer/components/core/loader/loader.interface"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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
  errorTitle: { id: "component.dataModal.errorTitle" },
  errorText: { id: "component.dataModal.errorText" },
  errorDescription: { id: "component.dataModalErrorDescription" },
  errorWithRetryButton: { id: "component.dataModalErrorWithRetryButton" },
  loadingTitle: { id: "component.dataModalLoadingTitle" },
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
  descriptionMessage = messages.errorDescription,
  ...props
}: {
  onClose?: () => void
  title?: string
  textMessage?: Message
  descriptionMessage?: Message
} & Partial<ModalProps>) => (
  <ErrorModal title={title} onClose={onClose} {...props}>
    <RoundIconWrapper>
      <Icon type={IconType.Fail} width={4} />
    </RoundIconWrapper>
    <Text displayStyle={TextDisplayStyle.Headline4} message={textMessage} />
    {descriptionMessage && (
      <Text
        displayStyle={TextDisplayStyle.Paragraph4}
        message={descriptionMessage}
      />
    )}
  </ErrorModal>
)

export const ErrorWithRetryDataModal = (props: {
  onClose?: () => void
  onRetry?: () => void
  title?: string
  textMessage?: Message
  descriptionMessage?: Message
}) => (
  <ErrorDataModal
    actionButtonLabel={intl.formatMessage(messages.errorWithRetryButton)}
    onActionButtonClick={props.onRetry}
    {...props}
  />
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
      <Text displayStyle={TextDisplayStyle.Headline4} message={textMessage} />
    )}
  </ErrorModal>
)
