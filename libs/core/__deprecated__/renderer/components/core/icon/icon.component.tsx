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
import { backgroundColor, fontWeight } from "Core/core/styles/theming/theme-getters"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled, { css } from "styled-components"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

export enum IconSize {
  Small = 1.6,
  Medium = 2.4,
  Big = 2.8,
  Bigger = 3.2,
}

export interface Props {
  badge?: boolean | IconBadgeType
  badgeCountIndicator?: number
  height?: number
  width?: number
  size?: IconSize
  type?: IconType
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

export enum IconBadgeType {
  Badge,
  BadgeWithCounter,
}

const getIconBadgeType = (
  badge: undefined | boolean | IconBadgeType
): IconBadgeType | undefined => {
  if (badge === true || badge === IconBadgeType.Badge) {
    return IconBadgeType.Badge
  } else if (badge === IconBadgeType.BadgeWithCounter) {
    return IconBadgeType.BadgeWithCounter
  } else {
    return undefined
  }
}

interface BadgeWithCounterProps {
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

const BadgeWithCounter: FunctionComponent<BadgeWithCounterProps> = ({
  indicator,
}) => {
  console.log("indicator: ", indicator)
  return <BadgeWithCounterContainer>{ indicator }</BadgeWithCounterContainer>
  // return <div>s</div>
}

const Icon: FunctionComponent<Props> = ({
  badge = false,
  badgeCountIndicator = 0,
  className,
  size,
  height,
  width,
  type,
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
        <BadgeWithCounter indicator={badgeCountIndicator} />
      )}
      <Svg Image={getIconType(type)} />
    </Wrapper>
  )
}

export default Icon
