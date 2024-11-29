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
  children,
  ...props
}) => {
  return <H3 {...props}>{isEmpty(children) ? config.text : children}</H3>
}

export const H3 = styled.h3`
  font-size: ${({ theme }) => theme.generic.fontSize.headline3};
  line-height: ${({ theme }) => theme.generic.lineHeight.headline3};
  margin: 0;
`

export const Header4: APIFC<undefined, HeaderConfig> = ({
  config,
  children,
  ...props
}) => {
  return <H4 {...props}>{isEmpty(children) ? config.text : children}</H4>
}

export const H4 = styled.h4`
  font-size: ${({ theme }) => theme.generic.fontSize.headline4};
  line-height: ${({ theme }) => theme.generic.lineHeight.headline4};
  letter-spacing: 0.02em;
  margin: 0;
`

export const Header5: APIFC<undefined, HeaderConfig> = ({
  config,
  children,
  ...props
}) => {
  return <H5 {...props}>{isEmpty(children) ? config.text : children}</H5>
}

export const H5 = styled.h5`
  font-size: ${({ theme }) => theme.generic.fontSize.headline5};
  line-height: ${({ theme }) => theme.generic.lineHeight.headline5};
  letter-spacing: 0.04em;
  font-weight: ${({ theme }) => theme.generic.fontWeight.bold};
  margin: 0;
`
