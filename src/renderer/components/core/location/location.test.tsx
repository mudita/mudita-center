import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import Location from "Renderer/components/core/location/location.component"
import React from "react"

test("Button's label is passed properly", () => {
  const buttonLabel = "Example button label"
  const { container } = renderWithThemeAndIntl(
    <Location buttonLabel={buttonLabel} />
  )
  expect(container).toHaveTextContent(buttonLabel)
})
