import React from "react"
import InputCheckbox from "Renderer/components/input-checkbox/input-checkbox.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <InputCheckbox
      name={"Example1"}
      value={"value2"}
      id={"id2"}
      label={"label"}
    />
  )
  expect(container).toMatchSnapshot()
})
