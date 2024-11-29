/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { ModalTitleConfig } from "generic-view/models"
import { isEmpty } from "lodash"

export const ModalTitle: APIFC<undefined, ModalTitleConfig> = ({
  data,
  config,
  children,
  ...rest
}) => {
  return <Title {...rest}>{isEmpty(children) ? config?.text : children}</Title>
}

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.generic.fontSize.modalTitle};
  line-height: ${({ theme }) => theme.generic.lineHeight.modalTitle};
  font-weight: ${({ theme }) => theme.generic.fontWeight.bold};
  text-align: center;
  align-self: center;
`
