import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import Location from "Renderer/components/core/location/location.component"
import { LocationPath } from "Renderer/components/core/location/location.enum"
import React from "react"

test("button has passed label", () => {
  const buttonLabel = "Example button label"
  const { container } = renderWithThemeAndIntl(
    <Location
      locationToUpdate={LocationPath.PureOsDownload}
      buttonLabel={buttonLabel}
    />
  )
  expect(container).toHaveTextContent(buttonLabel)
})
