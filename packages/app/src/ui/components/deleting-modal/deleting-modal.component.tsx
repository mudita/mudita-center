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
import Loader from "App/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "App/__deprecated__/renderer/components/core/loader/loader.interface"
import { DeletingModalTestIds } from "App/ui/components/deleting-modal/deleting-modal-test-ids.enum"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 0;
`

export interface DeletingModalProps extends ComponentProps<typeof ModalDialog> {
  title: string
  subtitle?: string
  body?: string
}

const DeletingModal: FunctionComponent<DeletingModalProps> = ({
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
        <Loader
          data-testid={DeletingModalTestIds.Loader}
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
    </Content>
  </ModalDialog>
)

export default DeletingModal
