/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import React, { ComponentProps } from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import ModalDialog from "App/__deprecated__/renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { ErrorSyncModalTestIds } from "App/connecting/components/error-sync-modal/error-sync-modal-test-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  errorSyncModalHeaderTitle: {
    id: "module.connecting.errorSyncModalHeaderTitle",
  },
  errorSyncModalButton: {
    id: "module.connecting.errorSyncModalButton",
  },
  errorSyncModalTitle: {
    id: "module.connecting.errorSyncModalTitle",
  },
  errorSyncModalDescription: {
    id: "module.connecting.errorSyncModalDescription",
  },
})

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p:first-of-type {
    margin-top: 0;
  }
`
interface Props extends ComponentProps<typeof ModalDialog> {
  onRetry: () => void
}

const ErrorSyncModal: FunctionComponent<Props> = ({ onRetry, ...props }) => {
  return (
    <ModalDialog
      testId={ErrorSyncModalTestIds.Container}
      size={ModalSize.Small}
      title={intl.formatMessage(messages.errorSyncModalHeaderTitle)}
      actionButtonSize={Size.FixedMedium}
      actionButtonLabel={intl.formatMessage(messages.errorSyncModalButton)}
      onActionButtonClick={onRetry}
      closeButton={false}
      zIndex={100}
      {...props}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.Fail} width={4} />
        </RoundIconWrapper>
        <ModalText
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.errorSyncModalTitle}
        />
        <ModalText
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.errorSyncModalDescription}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default ErrorSyncModal
