/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { AboutDataBoxConfig, AboutDataBoxData } from "generic-view/models"

const dataTestId = {
  aboutDataBoxWrapper: "about-data-box",
  label: "about-data-box-label",
  value: "about-data-box-value",
}

export const AboutDataBox: APIFC<AboutDataBoxData, AboutDataBoxConfig> = ({
  data,
  config,
  children,
  ...props
}) => {
  const dataTestIdSufix = config.title.toLocaleLowerCase().replaceAll(" ", "-")

  return (
    <Wrapper {...props} data-testid={dataTestId.aboutDataBoxWrapper}>
      <Title data-testid={`${dataTestId.label}-${dataTestIdSufix}`}>
        {config.title}
      </Title>
      {children ||
        (data?.text && (
          <Value data-testid={`${dataTestId.value}-${dataTestIdSufix}`}>
            {data?.text}
          </Value>
        ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.4rem;
  border-radius: ${({ theme }) => theme.generic.radius.sm};
  background-color: ${({ theme }) => theme.generic.color.white};
`

const Title = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.generic.color.grey2};
  font-size: ${({ theme }) => theme.generic.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.generic.lineHeight.paragraph1};
  letter-spacing: 0.032rem;
`

const Value = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.generic.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.generic.lineHeight.paragraph1};
`
