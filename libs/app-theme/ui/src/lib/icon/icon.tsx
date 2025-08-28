/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { IconSize, IconType } from "app-theme/models"
import { icons } from "./icons"
import styled, { css, keyframes } from "styled-components"

interface Props {
  type: IconType
  size?: IconSize
}

export const Icon: FunctionComponent<Props> = ({
  type,
  size = IconSize.Medium,
  ...props
}) => {
  const spin = [IconType.Spinner, IconType.Refreshing].includes(type)
  const spinSteps = type === IconType.Spinner ? 12 : undefined
  const IconComponent = icons[type]
  if (!IconComponent) return null
  return (
    <Wrapper
      $spin={spin}
      $spinSteps={spinSteps}
      $size={size}
      data-testid={`icon-${type}`}
      {...props}
    >
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

const Wrapper = styled.span<{
  $spin?: boolean
  $spinSteps?: number
  $size: IconSize
}>`
  display: inline-block;
  aspect-ratio: 1;
  transition: color 0.2s ease-in-out;

  ${({ $spin, $spinSteps }) =>
    $spin &&
    css`
      animation: ${spinAnimation} 1s ${$spinSteps ? `steps(${$spinSteps})` : ""}
        infinite linear;
    `};

  ${({ $size }) => {
    switch ($size) {
      case IconSize.Tiny:
        return css`
          width: 1.6rem;
          height: 1.6rem;
        `
      case IconSize.Small:
        return css`
          width: 2rem;
          height: 2rem;
        `
      case IconSize.Medium:
        return css`
          width: 2.4rem;
          height: 2.4rem;
        `
      case IconSize.Big:
        return css`
          width: 3.2rem;
          height: 3.2rem;
        `
      case IconSize.Large:
        return css`
          width: 4rem;
          height: 4rem;
        `
      case IconSize.AutoMax:
        return css`
          width: 100%;
          height: 100%;
        `
    }
  }}
`
