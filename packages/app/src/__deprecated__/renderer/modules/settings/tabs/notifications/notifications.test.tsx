/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import NotificationsUI from "App/__deprecated__/renderer/modules/settings/tabs/notifications/notifications-ui.component"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <NotificationsUI
      appIncomingCalls={false}
      appIncomingMessages={false}
      appLowBattery={false}
      appOsUpdates={false}
    />
  )
  expect(container).toMatchSnapshot()
})
