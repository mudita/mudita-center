/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import { withConfig } from "../utils/with-config"
import styled from "styled-components"

interface Config {
  text: string
}

const HeaderH3: APIFC<undefined, Config> = ({ config, data, ...props }) => {
  return <Header {...props}>{config?.text}</Header>
}

const Header = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.headline3};
  line-height: ${({ theme }) => theme.lineHeight.headline3};
  margin: 0;
`

export const HeaderH3WithConfig = withConfig(HeaderH3)
