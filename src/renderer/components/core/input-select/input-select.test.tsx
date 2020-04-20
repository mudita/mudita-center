import "@testing-library/jest-dom/extend-expect"
import "jest-styled-components"
import React from "react"
import InputSelect, {
  InputSelectProps,
} from "Renderer/components/core/input-select/input-select.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { fireEvent } from "@testing-library/dom"
import { data } from "Renderer/components/core/input-select/input-select.stories"

const renderInputSelect = ({ ...props }: Partial<InputSelectProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <InputSelect options={data} {...props} />
  )
  return {
    ...outcome,
    input: outcome.getByRole("textbox"),
    icon: outcome.getByTestId("actionIcon"),
    list: outcome.container.querySelector("ul"),
  }
}

test("select input renders properly", () => {
  const { input } = renderInputSelect()
  expect(input).toBeInTheDocument()
})

test("input focus/blur toggles the list", () => {
  const { list, input } = renderInputSelect()
  expect(list).not.toBeVisible()
  fireEvent.focus(input)
  expect(list).toBeVisible()
  fireEvent.blur(input)
  expect(list).not.toBeVisible()
})

test("input arrow click toggles the list", async () => {
  const { list, icon } = renderInputSelect()
  expect(list).not.toBeVisible()
  fireEvent.click(icon)
  expect(list).toBeVisible()
  fireEvent.click(icon)
  expect(list).not.toBeVisible()
})
