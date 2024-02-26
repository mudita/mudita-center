/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { IconType } from "generic-view/utils"
import { RoundIconWrapper } from "./round-icon-wrapper"
import Icon from "../icon/icon"

interface Props {
  icon: IconType
  title: string
}

export const RoundIconWithTitle: FunctionComponent<Props> = ({
  icon,
  title,
}) => {
  return (
    <Wrapper>
      <RoundIconWrapper>
        <Icon
          data={{
            type: icon,
          }}
        />
      </RoundIconWrapper>
      <Title>{title}</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.modalTitle};
  line-height: ${({ theme }) => theme.lineHeight.modalTitle};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
  margin: 0;
`
