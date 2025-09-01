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
  size?: IconSize | number
}

export const Icon: FunctionComponent<Props> & {
  getSize: typeof getIconSize
} = ({ type, size = IconSize.Medium, ...props }) => {
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

const getIconSize = (size?: IconSize | number) => {
  if (typeof size === "number") {
    return `${size}rem`
  }
  switch (size) {
    case IconSize.Tiny:
      return "1.6rem"
    case IconSize.Small:
      return "2rem"
    case IconSize.Big:
      return "3.2rem"
    case IconSize.Large:
      return "4rem"
    case IconSize.AutoMax:
      return "100%"
    case IconSize.Medium:
    default:
      return "2.4rem"
  }
}

Icon.getSize = getIconSize

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
  $size: IconSize | number
}>`
  display: inline-block;
  aspect-ratio: 1;
  transition: color 0.2s ease-in-out;

  ${({ $spin, $spinSteps }) =>
    $spin &&
    css`
      animation: ${spinAnimation} 1s ${$spinSteps ? `steps(${$spinSteps})` : ""}
        infinite;
      animation-timing-function: ${$spinSteps ? "steps" : "linear"};
    `};

  width: ${({ $size }) => getIconSize($size)};
  height: ${({ $size }) => getIconSize($size)};
`
