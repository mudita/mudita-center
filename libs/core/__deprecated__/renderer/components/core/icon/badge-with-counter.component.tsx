/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import styled, { css } from "styled-components"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  getTextStyles,
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { fontWeight, textColor } from "Core/core/styles/theming/theme-getters"

interface Props {
  indicator: number
  disabled?: boolean
}

const BadgeWithCounterContainer = styled.span<{
  disabled?: boolean
}>`
  ${getTextStyles(TextDisplayStyle.Headline5)};
  font-weight: ${fontWeight("default")};
  width: 2rem;
  height: 2rem;
  background-color: black;
  color: white;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  transform: translate(calc(50% + -0.2rem), calc(-50% + 0.8rem));
  ${({ disabled }) =>
    disabled
      ? css`
          background-color: ${textColor("secondary")};
        `
      : css``}
`
export const BadgeWithCounter: FunctionComponent<Props> = ({
  indicator,
  disabled,
}) => {
  return (
    <BadgeWithCounterContainer disabled={disabled}>
      {indicator}
    </BadgeWithCounterContainer>
  )
}
