/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { LabeledTextConfig, LabeledTextData } from "generic-view/models"

export const LabeledText: APIFC<LabeledTextData, LabeledTextConfig> = ({
  data,
  config,
  ...props
}) => {
  return (
    <div {...props}>
      <Label>{config.label}</Label>
      <Text>{data.text}</Text>
    </div>
  )
}

const Text = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
`

const Label = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.grey2};
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  letter-spacing: 0.04rem;
`
