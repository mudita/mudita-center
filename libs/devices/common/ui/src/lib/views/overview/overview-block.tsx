/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { Typography } from "app-theme/ui"

interface Props extends PropsWithChildren {
  title?: string
  description?: string
}

export const OverviewBlock: FunctionComponent<Props> = ({
  title,
  description,
  children,
  ...rest
}) => {
  return (
    <Wrapper {...rest}>
      {title && (
        <TitleWrapper>
          <Typography.H3>{title}</Typography.H3>
          {description && <Typography.P5>{description}</Typography.P5>}
        </TitleWrapper>
      )}
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 2.4rem;
  min-height: 17.2rem;
  background-color: ${({ theme }) => theme.app.color.white};
  border-radius: ${({ theme }) => theme.app.radius.sm};
  box-shadow: 0.2rem 0 3rem rgba(0, 0, 0, 0.08);
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
