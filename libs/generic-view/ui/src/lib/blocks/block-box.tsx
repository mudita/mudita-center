/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC, withConfig } from "generic-view/utils"

interface BlockBoxParameters {
  title?: string
}

const BlockBox: APIFC<undefined, BlockBoxParameters> = ({
  config,
  data,
  children,
  ...props
}) => {
  return (
    <Block {...props}>
      {config?.title && <Headline>{config.title}</Headline>}
      {children}
    </Block>
  )
}

export default withConfig(BlockBox)

const Block = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.space.xl};
  box-sizing: border-box;
`

const Headline = styled.h3`
  margin: 0 0 1.2rem 0;
  font-size: ${({ theme }) => theme.fontSize.headline3};
  line-height: ${({ theme }) => theme.lineHeight.headline3};
`
