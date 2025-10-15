/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import styled from "styled-components"
import { Badge, Typography, typographyStyles } from "app-theme/ui"

interface Props extends PropsWithChildren {
  title?: string
  description?: string
  badgeText?: string
}

export const OverviewBlock: FunctionComponent<Props> = ({
  title,
  description,
  badgeText,
  children,
  ...rest
}) => {
  return (
    <Wrapper {...rest}>
      {title && (
        <TitleWrapper>
          <Title>
            <Typography.H3>{title}</Typography.H3>
            {badgeText && <OverviewBlockBadge>{badgeText}</OverviewBlockBadge>}
          </Title>
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
  background-color: ${({ theme }) => theme.app.color.white};
  border-radius: ${({ theme }) => theme.app.radius.sm};
  box-shadow: 0.2rem 0 3rem rgba(0, 0, 0, 0.08);
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;
`

const OverviewBlockBadge = styled(Badge)`
  ${typographyStyles.paragraph.p5};
  height: 2.2rem;
  color: ${({ theme }) => theme.app.color.black};
  padding: 0.1rem 0.4rem;
  background-color: ${({ theme }) => theme.app.color.grey4};
  letter-spacing: 0.04rem;
`
