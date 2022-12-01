/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import NotificationsUI from "App/settings/components/notifications/notifications-ui.component"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <NotificationsUI
      incomingCalls={false}
      incomingMessages={false}
      lowBattery={false}
      osUpdates={false}
      setIncomingCalls={jest.fn()}
      setIncomingMessages={jest.fn()}
      setLowBattery={jest.fn()}
      setOsUpdates={jest.fn()}
    />
  )
  expect(container).toMatchSnapshot()
})
