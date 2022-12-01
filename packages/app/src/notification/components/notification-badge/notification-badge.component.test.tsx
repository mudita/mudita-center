/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* eslint-disable @typescript-eslint/no-empty-function */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { NotificationBadgeTestIds } from "./notification-badge-ids.enum"
import { NotificationBadge } from "./notification-badge.component"
import { NotificationBadgeProps } from "./notification-badge.interface"

const render = (props: NotificationBadgeProps) =>
  renderWithThemeAndIntl(<NotificationBadge {...props} />)

test("Notification badge isn't visible when active flag is `falsy`", () => {
  const { queryByTestId } = render({ active: false })
  expect(
    queryByTestId(NotificationBadgeTestIds.BadgeCircle)
  ).not.toBeInTheDocument()
})

test("Notification badge is visible when active flag is `truly`", () => {
  const { queryByTestId } = render({ active: true })
  expect(
    queryByTestId(NotificationBadgeTestIds.BadgeCircle)
  ).toBeInTheDocument()
})
