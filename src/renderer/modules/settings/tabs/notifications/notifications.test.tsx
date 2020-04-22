import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import Notifications from "Renderer/modules/settings/tabs/notifications/notifications.component"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(<Notifications />)
  expect(container).toMatchSnapshot()
})
