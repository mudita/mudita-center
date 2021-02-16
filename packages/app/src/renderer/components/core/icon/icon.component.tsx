/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import * as React from "react"
import {
  getEnumName,
  getIconType,
  Type,
} from "Renderer/components/core/icon/icon.config"
import Svg from "Renderer/components/core/svg/svg.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

export enum IconSize {
  Small = 1.4,
  Medium = 2.4,
  Big = 2.8,
  Bigger = 3.2,
}

export interface Props {
  badge?: boolean
  height?: number
  width?: number
  size?: IconSize
  type?: Type
}

const badgeStyles = css`
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: -0.2rem;
    right: -0.3rem;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    background-color: ${backgroundColor("activity")};
  }
`

const Wrapper = styled.i<{
  badge?: boolean
  height?: number
  width?: number
  size?: IconSize
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height = 2, size }) => (size ? `${size}rem` : `${height}rem`)};
  width: ${({ width = 2, size }) => (size ? `${size}rem` : `${width}rem`)};
  position: relative;
  font-style: normal;

  svg {
    width: 100%;
    height: 100%;
  }

  ${({ badge }) => badge && badgeStyles};
`

const Icon: FunctionComponent<Props> = ({
  badge = false,
  className,
  size,
  height,
  width,
  type,
  ...rest
}) => {
  return (
    <Wrapper
      badge={badge}
      data-testid={`icon-${getEnumName(type)}`}
      className={className}
      height={size || height || width}
      width={size || width || height}
      {...rest}
    >
      <Svg Image={getIconType(type)} />
    </Wrapper>
  )
}

export default Icon
