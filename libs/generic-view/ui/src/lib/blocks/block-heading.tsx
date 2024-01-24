/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC, withConfig } from "generic-view/utils"

interface Config {
  heading: string
  subheading: string
}

const BlockHeading: APIFC<undefined, Config> = ({ config, data, ...props }) => {
  return (
    <div {...props}>
      <Header>{config?.heading}</Header>
      <Subheader>{config?.subheading}</Subheader>
    </div>
  )
}

export default withConfig(BlockHeading)

const Header = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.headline3};
  line-height: ${({ theme }) => theme.lineHeight.headline3};
  margin: 0;
`

const Subheader = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph4};
  line-height: ${({ theme }) => theme.lineHeight.paragraph4};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.color.grey2};
  letter-spacing: 0.07rem;
  margin: 0;
`
