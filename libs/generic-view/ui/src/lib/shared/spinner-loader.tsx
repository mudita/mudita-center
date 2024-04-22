/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled, { keyframes } from "styled-components"
import { Icon } from "../icon/icon"
import { IconType } from "generic-view/utils"

export const SpinnerLoader: FunctionComponent = () => {
  return (
    <Wrapper>
      <Icon data={{ type: IconType.Spinner }} />
    </Wrapper>
  )
}

const spinAnimation = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

const Wrapper = styled.div`
  display: block;
  width: 3.2rem;
  height: 3.2rem;
  animation: ${spinAnimation} 1s steps(12) infinite;
`
