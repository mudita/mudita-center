/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import {
  getEnumName,
  getIconType,
} from "Core/__deprecated__/renderer/components/core/icon/icon.config"
import Svg from "Core/__deprecated__/renderer/components/core/svg/svg.component"
import { backgroundColor } from "Core/core/styles/theming/theme-getters"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled, { css } from "styled-components"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { BadgeWithCounter } from "Core/__deprecated__/renderer/components/core/icon/badge-with-counter.component"
import { getIconBadgeType } from "Core/__deprecated__/renderer/components/core/icon/get-icon-badge-type.helper"
import { IconBadgeType } from "Core/__deprecated__/renderer/components/core/icon/icon-badge-type.constant"

export enum IconSize {
  Small = 1.6,
  Medium = 2.4,
  Big = 2.8,
  Large = 3.2,
  ExtraLarge = 3.6,
  Enormous = 4.8,
}

export interface Props {
  badge?: boolean | IconBadgeType
  badgeCountIndicator?: number
  height?: number
  width?: number
  size?: IconSize
  type?: IconType
  disabled?: boolean
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

const Wrapper = styled.span<{
  badge: boolean
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
  badgeCountIndicator = 0,
  className,
  size,
  height,
  width,
  type,
  disabled,
  ...rest
}) => {
  const iconBadgeType = getIconBadgeType(badge)
  return (
    <Wrapper
      badge={iconBadgeType === IconBadgeType.Badge}
      data-testid={`icon-${getEnumName(type) ?? ""}`}
      className={className}
      height={size || height || width}
      width={size || width || height}
      {...rest}
    >
      {iconBadgeType === IconBadgeType.BadgeWithCounter && (
        <BadgeWithCounter indicator={badgeCountIndicator} disabled={disabled} />
      )}
      <Svg Image={getIconType(type)} />
    </Wrapper>
  )
}

export default Icon
