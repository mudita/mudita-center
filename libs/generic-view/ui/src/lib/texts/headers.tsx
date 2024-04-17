/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled from "styled-components"
import { HeaderConfig } from "generic-view/models"
import { isEmpty } from "lodash"

export const Header3: APIFC<undefined, HeaderConfig> = ({
  config,
  data,
  children,
  ...props
}) => {
  return <H3 {...props}>{isEmpty(children) ? config?.text : children}</H3>
}

const H3 = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.headline3};
  line-height: ${({ theme }) => theme.lineHeight.headline3};
  margin: 0;
`
