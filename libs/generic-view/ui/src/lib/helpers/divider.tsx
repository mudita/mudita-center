/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"

export const Divider: APIFC = ({ data, config, ...props }) => {
  return <Line {...props} />
}

export default Divider

export const Line = styled.hr`
  border: none;
  width: 100%;
  margin: 0;
  border-top: 0.01rem solid ${({ theme }) => theme.color.grey4};
`
