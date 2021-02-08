/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
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

describe("checkbox matches sizes", () => {
  const dataTestId = "checkbox-wrapper"
  const testScenario = [
    { size: Size.Large, result: "2rem" },
    { size: Size.Medium, result: "1.6rem" },
    { size: Size.Small, result: "1.4rem" },
  ]
  testScenario.forEach(({ size, result }) => {
    test(`size: ${size}`, () => {
      const { getByTestId } = renderWithThemeAndIntl(
        <InputCheckbox
          name={"Example1"}
          value={"value2"}
          id={"id2"}
          label={"label"}
          size={size}
        />
      )
      expect(getByTestId(dataTestId)).toHaveStyleRule("height", result)
      expect(getByTestId(dataTestId)).toHaveStyleRule("width", result)
    })
  })
})
