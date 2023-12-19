/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalText } from "Core/contacts/components/sync-contacts-modal/sync-contacts.styled"
import {
  Content as ModalContent,
  Subbody,
} from "Core/ui/components/error-modal/error-modal.styled"
import { ModalDialog } from "Core/ui/components/modal-dialog"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { RoundIconWrapper } from "Core/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import { Message as MessageInterface } from "Core/__deprecated__/renderer/interfaces/message.interface"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import React, { ComponentProps } from "react"

export interface ErrorModalProps extends ComponentProps<typeof ModalDialog> {
  title: string
  subtitle?: string
  body?: MessageInterface | string
  subbody?: string
}

const ErrorModal: FunctionComponent<ErrorModalProps> = ({
  title,
  subtitle,
  body,
  subbody,
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
        <ModalText
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={body}
        />
      )}
      {subbody && (
        <Subbody
          displayStyle={TextDisplayStyle.Paragraph3}
          color="secondary"
          message={subbody}
        />
      )}
    </ModalContent>
  </ModalDialog>
)

export default ErrorModal
