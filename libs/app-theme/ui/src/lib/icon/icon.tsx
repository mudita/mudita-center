/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { IconType } from "app-theme/models"
import { icons } from "./icons"
import styled, { css, keyframes } from "styled-components"

interface Props {
  type: IconType
  size?: "auto-min" | "auto-max" | "tiny" | "small" | "medium" | "big" | "large"
}

export const Icon: FunctionComponent<Props> = ({
  type,
  size = "auto-max",
  ...props
}) => {
  const spin = [IconType.Spinner].includes(type)
  const IconComponent = icons[type]
  if (!IconComponent) return null
  return (
    <Wrapper $spin={spin} $size={size} {...props}>
      <IconComponent width={"100%"} height={"100%"} />
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

const Wrapper = styled.div<{ $spin?: boolean; $size: Props["size"] }>`
  aspect-ratio: 1;

  ${({ $spin }) =>
    $spin &&
    css`
      animation: ${spinAnimation} 1s steps(12) infinite;
    `};

  ${({ $size }) => {
    switch ($size) {
      case "tiny":
        return css`
          width: 1.2rem;
          height: 1.2rem;
        `
      case "small":
        return css`
          width: 1.8rem;
          height: 1.8rem;
        `
      case "medium":
        return css`
          width: 2.4rem;
          height: 2.4rem;
        `
      case "big":
        return css`
          width: 3.2rem;
          height: 3.2rem;
        `
      case "large":
        return css`
          width: 4rem;
          height: 4rem;
        `
      case "auto-min":
        return css`
          height: fit-content;
        `
      case "auto-max":
        return css`
          height: 100%;
        `
    }
  }}
`
