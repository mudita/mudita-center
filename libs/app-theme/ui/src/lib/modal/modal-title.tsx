/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { isEmpty } from "lodash"
import { ModalTestId, TypographyAlign } from "app-theme/models"
import { Typography } from "../typography/typography"

interface Props extends PropsWithChildren {
  text?: string
}

export const ModalTitle: FunctionComponent<Props> = ({
  children,
  text,
  ...rest
}) => {
  return (
    <Title
      {...rest}
      data-testid={ModalTestId.Title}
      textAlign={TypographyAlign.Center}
      forwardedAs="h1"
    >
      {isEmpty(children) ? text : children}
    </Title>
  )
}

const Title = styled(Typography.H3)`
  font-size: ${({ theme }) => theme.app.fontSize.modalTitle};
  line-height: ${({ theme }) => theme.app.lineHeight.modalTitle};
`
