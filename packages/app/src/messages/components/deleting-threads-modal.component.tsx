/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import styled from "styled-components"
import { RoundIconWrapper } from "Renderer/components/core/modal-shared/modal-shared"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 0;
`

export interface DeletingThreadsModalProps
  extends ComponentProps<typeof ModalDialog> {
  title: string
  subtitle?: string
  body?: string
}

const DeletingThreadsModal: FunctionComponent<DeletingThreadsModalProps> = ({
  title,
  subtitle,
  body,
  ...rest
}) => (
  <ModalDialog
    size={ModalSize.Small}
    title={title}
    closeable={false}
    closeButton={false}
    {...rest}
  >
    <Content>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} />
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
    </Content>
  </ModalDialog>
)

export default DeletingThreadsModal
