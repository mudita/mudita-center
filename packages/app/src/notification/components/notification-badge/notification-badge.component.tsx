/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"

import { NotificationBadgeProps } from "./notification-badge.interface"
import { NotificationBadgeTestIds } from "./notification-badge-ids.enum"

const NotificationCircle = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  top: 6px;
  left: 24px;
  background-color: ${({ theme }) => theme.color.background.activity};
  border: 2px solid ${({ theme }) => theme.color.border.white};
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
