import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <NotificationsUI
      appIncomingCalls={false}
      appIncomingMessages={false}
      lowBattery={false}
      osUpdates={false}
    />
  )
  expect(container).toMatchSnapshot()
})
