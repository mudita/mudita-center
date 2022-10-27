/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import React, { ComponentProps } from "react"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { Message } from "App/__deprecated__/renderer/interfaces/message.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import Loader from "App/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "App/__deprecated__/renderer/components/core/loader/loader.interface"
import { ModalDialog } from "App/ui/components/modal-dialog"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const RoundIconWrapper = styled.div`
  width: 8rem;
  height: 8rem;
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

interface Props extends ComponentProps<typeof ModalDialog> {
  title?: string
  textMessage?: Message
}

export const DownloadContactsModal: FunctionComponent<Props> = ({
  title = intl.formatMessage(messages.loadingTitle),
  textMessage,
  ...props
}) => (
  <ModalDialog
    closeButton={false}
    title={title}
    size={ModalSize.Small}
    {...props}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} />
      </RoundIconWrapper>
      {textMessage && (
        <Text displayStyle={TextDisplayStyle.Headline4} message={textMessage} />
      )}
    </ModalContent>
  </ModalDialog>
)
