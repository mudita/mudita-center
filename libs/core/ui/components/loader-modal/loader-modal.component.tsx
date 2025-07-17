/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import { ModalText } from "Core/contacts/components/sync-contacts-modal/sync-contacts.styled"
import styled from "styled-components"
import { RoundIconWrapper } from "Core/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import { ModalDialog } from "Core/ui/components/modal-dialog"
import Loader from "Core/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "Core/__deprecated__/renderer/components/core/loader/loader.interface"
import { LoaderModalTestIds } from "Core/ui/components/loader-modal/loader-modal-test-ids.enum"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export interface LoaderModalProps extends ComponentProps<typeof ModalDialog> {
  title?: string
  subtitle?: string
  body?: string
}

const LoaderModal: FunctionComponent<LoaderModalProps> = ({
  subtitle,
  body,
  children,
  ...rest
}) => (
  <ModalDialog
    size={ModalSize.Small}
    closeable={false}
    closeButton={false}
    {...rest}
  >
    <Content>
      <RoundIconWrapper>
        <Loader
          data-testid={LoaderModalTestIds.Loader}
          type={LoaderType.Spinner}
        />
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
      {children}
    </Content>
  </ModalDialog>
)

export default LoaderModal
