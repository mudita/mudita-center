/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { FunctionComponent } from "react"
import {
  LegacyIconBadgeType,
  LegacyIconSize,
  LegacyIconType,
} from "app-theme/models"
import { backgroundColor, getIconBadgeType } from "app-theme/utils"
import { BadgeWithCounter } from "./badge-with-counter.component"
import { getIconType } from "./legacy-get-icon-type"
import { LegacySvg } from "./svg.component"
import { getEnumName } from "./legacy-get-enum-name"

export interface Props {
  badge?: boolean | LegacyIconBadgeType
  badgeCountIndicator?: number
  height?: number
  width?: number
  size?: LegacyIconSize
  type?: LegacyIconType
  disabled?: boolean
  className?: string
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
  size?: LegacyIconSize
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

export const LegacyIcon: FunctionComponent<Props> = ({
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
      badge={iconBadgeType === LegacyIconBadgeType.Badge}
      data-testid={`icon-${getEnumName(type) ?? ""}`}
      className={className}
      height={size || height || width}
      width={size || width || height}
      {...rest}
    >
      {iconBadgeType === LegacyIconBadgeType.BadgeWithCounter && (
        <BadgeWithCounter indicator={badgeCountIndicator} disabled={disabled} />
      )}
      <LegacySvg Image={getIconType(type)} />
    </Wrapper>
  )
}
