/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import styled from "styled-components"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import ModalDialog from "App/__deprecated__/renderer/components/core/modal-dialog/modal-dialog.component"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { defineMessages } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { Message as TranslationMessage } from "App/__deprecated__/renderer/interfaces/message.interface"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 0;
`

const messages = defineMessages({
  cancelButton: { id: "module.templates.cancelButton" },
  deleteButton: { id: "module.templates.deleteButton" },
  title: { id: "module.templates.deleteModalTitle" },
})

export interface DeletingThreadsModalProps
  extends ComponentProps<typeof ModalDialog> {
  info?: TranslationMessage
}

const DeleteConfirmationModal: FunctionComponent<DeletingThreadsModalProps> = ({
  info,
  onActionButtonClick,
  onCloseButton,
  ...rest
}) => (
  <ModalDialog
    size={ModalSize.Small}
    title={intl.formatMessage(messages.title)}
    closeModal={onCloseButton}
    onCloseButton={onCloseButton}
    closeButtonLabel={intl.formatMessage(messages.cancelButton)}
    actionButtonLabel={intl.formatMessage(messages.deleteButton)}
    onActionButtonClick={onActionButtonClick}
    actionButtonSize={Size.FixedSmall}
    {...rest}
  >
    <Content>
      <RoundIconWrapper>
        <Icon
          type={IconType.DeleteBig}
          width={12}
          height={12}
          data-testid="icon-delete"
        />
      </RoundIconWrapper>
      {info && (
        <ModalText
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={info}
        />
      )}
    </Content>
  </ModalDialog>
)

export default DeleteConfirmationModal
