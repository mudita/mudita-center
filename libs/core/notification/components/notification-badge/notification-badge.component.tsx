/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { ThemeProps } from "styled-components"
import { FunctionComponent } from "Core/core/types/function-component.interface"

import { NotificationBadgeProps } from "./notification-badge.interface"
import { NotificationBadgeTestIds } from "./notification-badge-ids.enum"
import { AppTheme } from "Root/app-theme"

const NotificationCircle = styled.div`
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  top: 0.6rem;
  left: 2.5rem;
  background-color: ${({ theme }: ThemeProps<AppTheme>) =>
    theme.core.color.background.activity};
  border: 0.2rem solid
    ${({ theme }: ThemeProps<AppTheme>) => theme.core.color.border.white};
  border-radius: 50%;
  z-index: 1;
`

export const NotificationBadge: FunctionComponent<NotificationBadgeProps> = ({
  active,
  children,
}) => {
  return (
    <>
      {active && (
        <NotificationCircle
          data-testid={NotificationBadgeTestIds.BadgeCircle}
        />
      )}
      {children}
    </>
  )
}
