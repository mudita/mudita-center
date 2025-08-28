/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, ReactNode } from "react"
import styled from "styled-components"
import { Typography } from "app-theme/ui"

interface Props {
  iconComponent: ReactNode
  title: string
  description?: string
}

export const OverviewStatusItem: FunctionComponent<Props> = ({
  iconComponent,
  title,
  description,
}) => {
  return (
    <Wrapper>
      {Boolean(iconComponent) && <IconWrapper>{iconComponent}</IconWrapper>}
      <TextWrapper>
        <Typography.H4>{title}</Typography.H4>
        {Boolean(description) && <Typography.P5>{description}</Typography.P5>}
      </TextWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.app.color.grey6};
  border-radius: 0.4rem;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
