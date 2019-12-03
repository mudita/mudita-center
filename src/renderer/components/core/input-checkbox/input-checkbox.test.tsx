import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
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

test("renders label when provided with text", () => {
  const labelText = "label"
  const { container } = renderWithThemeAndIntl(
    <InputCheckbox
      name={"Example1"}
      value={"value2"}
      id={"id2"}
      label={labelText}
    />
  )
  const label = container.querySelector("label")
  expect(label).toBeInTheDocument()
  expect(label).toHaveTextContent(labelText)
})
