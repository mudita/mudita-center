/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import styled from "styled-components"
import { AccordionConfig } from "Libs/generic-view/models/src"
import { APIFC } from "generic-view/utils"
import { ButtonBase } from "../../buttons/button-base/button-base"

export const Accordion: APIFC<undefined, AccordionConfig> = ({
  config,
  children,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return <Button {...props}>{config.collapsedButtonText}</Button>
}

const Button = styled(ButtonBase)`
  justify-content: center;
  background-color: ${({ theme }) => theme.color.grey1};
  padding: 0 1rem;
  transition: background-color 0.15s ease-in-out;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.fontSize.buttonText};
  line-height: ${({ theme }) => theme.lineHeight.buttonText};
  color: ${({ theme }) => theme.color.white};
  letter-spacing: 0.1em;
  text-transform: uppercase;

  && {
    height: 4rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.black};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.grey1};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.grey4};
    color: ${({ theme }) => theme.color.grey2};
  }
`
