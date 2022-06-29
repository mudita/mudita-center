/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { DeletingConfirmationsModalProps } from "App/ui/components/delete-confirmation-modal/delete-confirmation-modal.interface"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React from "react"
import styled from "styled-components"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 0;
`

export const DeleteConfirmationModal: FunctionComponent<
  DeletingConfirmationsModalProps
> = ({
  info,
  onActionButtonClick,
  onCloseButton,
  cancelButtonLabel,
  actionButtonLabel,
  titleLabel,
  ...rest
}) => (
  <ModalDialog
    size={ModalSize.Small}
    title={titleLabel}
    closeModal={onCloseButton}
    onCloseButton={onCloseButton}
    closeButtonLabel={cancelButtonLabel}
    actionButtonLabel={actionButtonLabel}
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
