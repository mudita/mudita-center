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
import { ModalDialog } from "App/ui/components/modal-dialog"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { ErrorUpdateModalTestIds } from "App/connecting/components/error-update-modal/error-update-modal-test-ids.enum"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  errorUpdateModalHeaderTitle: {
    id: "module.connecting.errorUpdateModalHeaderTitle",
  },
  errorUpdateModalTitle: {
    id: "module.connecting.errorUpdateModalTitle",
  },
  errorUpdateModalDescription: {
    id: "module.connecting.errorUpdateModalDescription",
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

const ErrorUpdateModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ onClose, ...props }) => {
  return (
    <ModalDialog
      testId={ErrorUpdateModalTestIds.Container}
      size={ModalSize.Small}
      title={intl.formatMessage(messages.errorUpdateModalHeaderTitle)}
      actionButtonSize={Size.FixedMedium}
      onCloseButton={onClose}
      onClose={onClose}
      zIndex={100}
      {...props}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.ThinFail} width={3.2} />
        </RoundIconWrapper>
        <ModalText
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.errorUpdateModalTitle}
        />
        <ModalText
          displayStyle={TextDisplayStyle.Paragraph4}
          message={messages.errorUpdateModalDescription}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default ErrorUpdateModal
