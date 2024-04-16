/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"

export const ModalTitle: APIFC = ({ data, config, children, ...rest }) => {
  return <Title {...rest}>{children}</Title>
}

export default ModalTitle

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.modalTitle};
  line-height: ${({ theme }) => theme.lineHeight.modalTitle};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
  align-self: center;
`
