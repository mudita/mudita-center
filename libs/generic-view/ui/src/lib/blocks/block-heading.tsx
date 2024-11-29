/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { BlockHeadingConfig } from "generic-view/models"

export const BlockHeading: APIFC<undefined, BlockHeadingConfig> = ({
  config,
  ...props
}) => {
  return (
    <div {...props}>
      <Header>{config.heading}</Header>
      {config.subheading && <Subheader>{config.subheading}</Subheader>}
    </div>
  )
}

const Header = styled.h3`
  font-size: ${({ theme }) => theme.generic.fontSize.headline3};
  line-height: ${({ theme }) => theme.generic.lineHeight.headline3};
  margin: 0;
`

const Subheader = styled.p`
  font-size: ${({ theme }) => theme.generic.fontSize.paragraph4};
  line-height: ${({ theme }) => theme.generic.lineHeight.paragraph4};
  font-weight: ${({ theme }) => theme.generic.fontWeight.light};
  color: ${({ theme }) => theme.generic.color.grey2};
  letter-spacing: 0.07rem;
  margin: 0;
`
