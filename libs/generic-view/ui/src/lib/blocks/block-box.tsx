/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { Badge } from "../data-rows/badge"
import { BlockBoxConfig, BlockBoxData } from "generic-view/models"

export const BlockBox: APIFC<BlockBoxData, BlockBoxConfig> = ({
  config,
  data,
  children,
  ...props
}) => {
  return (
    <Block {...props} data-testid={`block-box-${props.componentKey}`}>
      {config?.title && (
        <Headline>
          {config.title}
          {data?.badgeText && (
            <HeadlineBadge data={{ variant: "dark", text: data.badgeText }} />
          )}
        </Headline>
      )}
      {children}
    </Block>
  )
}

const Block = styled.div`
  background-color: ${({ theme }) => theme.generic.color.white};
  border-radius: ${({ theme }) => theme.generic.radius.sm};
  padding: ${({ theme }) => theme.generic.space.xl};
  box-sizing: border-box;
`

const Headline = styled.h3`
  margin: 0 0 1.2rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${({ theme }) => theme.generic.fontSize.headline3};
  line-height: ${({ theme }) => theme.generic.lineHeight.headline3};
`

const HeadlineBadge = styled(Badge)`
  margin-left: ${({ theme }) => theme.generic.space.lg};
`
