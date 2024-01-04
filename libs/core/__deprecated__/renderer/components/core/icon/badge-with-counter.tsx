/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import styled from "styled-components"
import { fontWeight } from "Core/core/styles/theming/theme-getters"
import { FunctionComponent } from "Core/core/types/function-component.interface"

interface Props {
  indicator: number
}

const BadgeWithCounterContainer = styled.span`
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
  font-size: 1.2rem;
  font-weight: ${fontWeight("bold")};
  transform: translate(calc(50% + -0.2rem), calc(-50% + 0.8rem));
`
export const BadgeWithCounter: FunctionComponent<Props> = ({ indicator }) => {
  return <BadgeWithCounterContainer>{indicator}</BadgeWithCounterContainer>
}
