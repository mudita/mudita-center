import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import LastUpdate from "Renderer/components/rest/news/last-update/last-update.component"
import { intl } from "Renderer/utils/intl"

test("should render offline text when offline prop is set to true", () => {
  const { container } = renderWithThemeAndIntl(
    <LastUpdate offline date="2019-10-18T11:27:15.256Z" />
  )

  expect(container.firstChild).toHaveTextContent(
    intl.formatMessage({ id: "view.name.news.offlineText" })
  )
})
