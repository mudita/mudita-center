/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { isEmpty } from "lodash"
import { ModalTestId } from "app-theme/models"

interface Props extends PropsWithChildren {
  text?: string
}

export const ModalTitle: FunctionComponent<Props> = ({
  children,
  text,
  ...rest
}) => {
  return (
    <Title {...rest} data-testid={ModalTestId.Title}>
      {isEmpty(children) ? text : children}
    </Title>
  )
}

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.app.fontSize.modalTitle};
  line-height: ${({ theme }) => theme.app.lineHeight.modalTitle};
  font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  text-align: center;
  align-self: center;
`
