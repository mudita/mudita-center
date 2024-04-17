/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { AboutDataBoxConfig, AboutDataBoxData } from "generic-view/models"

export const AboutDataBox: APIFC<AboutDataBoxData, AboutDataBoxConfig> = ({
  data,
  config,
  children,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Title>{config?.title}</Title>
      {children || (data?.text && <Value>{data?.text}</Value>)}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.4rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.color.white};
`

const Title = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.grey2};
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
  letter-spacing: 0.032rem;
`

const Value = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
`
