import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputRadio from "Renderer/components/input-radio/input-radio.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("should render with label and label text", () => {
  const labelText = "Example"
  const { container } = renderWithThemeAndIntl(
    <InputRadio
      name={"Example1"}
      value={"value2"}
      id={"id2"}
      label={labelText}
    />
  )
  expect(container.querySelector("label")).toBeInTheDocument()
  expect(container.querySelector("label")).toHaveTextContent(labelText)
})
