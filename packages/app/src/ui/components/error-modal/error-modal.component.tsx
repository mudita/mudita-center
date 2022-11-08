/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import styled from "styled-components"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
  margin: 0 auto;

  p {
    text-align: center;
    line-height: 1.4;
    white-space: pre-wrap;
  }

  p + p {
    margin-top: 1.2rem;
  }
`
export interface ErrorModalProps extends ComponentProps<typeof ModalDialog> {
  title: string
  subtitle?: string
  body?: string
}

const ErrorModal: FunctionComponent<ErrorModalProps> = ({
  title,
  subtitle,
  body,
  ...rest
}) => (
  <ModalDialog title={title} size={ModalSize.Small} {...rest}>
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={IconType.ThinFail} width={3.2} />
      </RoundIconWrapper>
      {subtitle && (
        <ModalText displayStyle={TextDisplayStyle.Headline4}>
          {subtitle}
        </ModalText>
      )}
      {body && (
        <ModalText displayStyle={TextDisplayStyle.Paragraph4} color="secondary">
          {body}
        </ModalText>
      )}
    </ModalContent>
  </ModalDialog>
)

export default ErrorModal
