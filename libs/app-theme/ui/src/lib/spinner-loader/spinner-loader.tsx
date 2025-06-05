/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled, { css, keyframes } from "styled-components"
import { Icon } from "../icon/icon"
import { IconType } from "app-theme/models"

interface Props {
  dark?: boolean
}

export const SpinnerLoader: FunctionComponent<Props> = ({ dark, ...props }) => {
  return (
    <Wrapper {...props}>
      <SpinnerIcon type={dark ? IconType.SpinnerDark : IconType.Spinner} />
    </Wrapper>
  )
}

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

export const spinAnimation = css`
  animation: ${spin} 1s steps(12) infinite;
`

const Wrapper = styled.div`
  display: block;
  width: 3.2rem;
  height: 3.2rem;
  ${spinAnimation};
`

const SpinnerIcon = styled(Icon)`
  width: 100%;
  height: 100%;
`
