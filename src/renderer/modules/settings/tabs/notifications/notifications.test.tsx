/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"

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
