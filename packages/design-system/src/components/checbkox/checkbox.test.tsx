import React, { ComponentProps } from "react"
import { renderWithTheme } from "../../utils/render-with-theme"
import { Checkbox } from "./checkbox.component"
import { CheckboxSize, TestId } from "./checkbox.enum"
import {
  getCheckboxLabelSpacing,
  getLabelTextVariant,
} from "./checkbox.helpers"
import { textVariants } from "../text/text.helpers"
import { getFontSize, theme } from "../../theme"
import { fireEvent } from "@testing-library/react"

const renderCheckboxComponent = (props: ComponentProps<typeof Checkbox>) => {
  const outcome = renderWithTheme(<Checkbox {...props} />)
  return {
    ...outcome,
    wrapper: () => outcome.queryByTestId(TestId.Wrapper),
    input: () => outcome.getByRole("checkbox"),
    checkedIcon: () => outcome.queryByTestId(TestId.CheckedIcon),
    indeterminateIcon: () => outcome.queryByTestId(TestId.IndeterminateIcon),
    label: () => outcome.queryByTestId(TestId.BasicLabel),
    icon: () => outcome.queryByTestId(TestId.Icon),
  }
}

test("Default checkbox renders properly", () => {
  const {
    input,
    checkedIcon,
    indeterminateIcon,
    label,
  } = renderCheckboxComponent({})

  expect(input()).not.toBeChecked()
  expect(checkedIcon()).not.toBeVisible()
  expect(indeterminateIcon()).not.toBeVisible()
  expect(label()).not.toBeInTheDocument()
})

test("Checked checkbox renders properly", () => {
  const { input, checkedIcon, indeterminateIcon } = renderCheckboxComponent({
    checked: true,
    onChange: jest.fn,
  })

  expect(input()).toBeChecked()
  expect(checkedIcon()).toBeVisible()
  expect(indeterminateIcon()).not.toBeVisible()
})

test("Indeterminate checkbox renders properly", () => {
  const { input, checkedIcon, indeterminateIcon } = renderCheckboxComponent({
    indeterminate: true,
  })

  expect(input()).toBePartiallyChecked()
  expect(checkedIcon()).not.toBeVisible()
  expect(indeterminateIcon()).toBeVisible()
})

test.each([
  [CheckboxSize.Small, 1.4],
  [CheckboxSize.Basic, 1.6],
  [CheckboxSize.Big, 2],
  [undefined, 1.6],
])("Checkbox size '%p' is rendered properly", (checkboxSize, expectedSize) => {
  const { icon } = renderCheckboxComponent({
    size: checkboxSize,
  })

  expect(icon()).toHaveStyleRule("width", `${expectedSize}rem`)
  expect(icon()).toHaveStyleRule("height", `${expectedSize}rem`)
})

test("Basic label is rendered properly", () => {
  const { label } = renderCheckboxComponent({
    label: "Test label",
  })

  expect(label()).toBeInTheDocument()
  expect(label()).toHaveTextContent("Test label")
})

test("Custom label is rendered properly", () => {
  const { getByText, label } = renderCheckboxComponent({
    children: "Test label",
  })

  expect(label()).not.toBeInTheDocument()
  expect(getByText("Test label")).toBeInTheDocument()
})

test.each([...Object.values(CheckboxSize), undefined])(
  "Basic label is styled properly for '%p' checkbox size",
  (checkboxSize) => {
    const { label } = renderCheckboxComponent({
      size: checkboxSize,
      label: "label",
    })

    const spacing = getCheckboxLabelSpacing(checkboxSize)
    expect(label()).toHaveStyleRule("margin-left", spacing)

    const variant = getLabelTextVariant(checkboxSize)
    const size = textVariants[variant].size
    if (size) {
      const fontSize = getFontSize(size)({ theme })
      expect(label()).toHaveStyleRule("font-size", fontSize)
    } else {
      expect(label()).not.toHaveStyleRule("font-size")
    }
  }
)

test("Clicking on a wrapper toggles checkbox properly", () => {
  const { wrapper, input } = renderCheckboxComponent({
    label: "label",
  })

  fireEvent.click(wrapper() as Element)
  expect(input()).toBeChecked()
  fireEvent.click(wrapper() as Element)
  expect(input()).not.toBeChecked()
})

test("Custom onChange function is passed properly", () => {
  const onChange = jest.fn()

  const { input } = renderCheckboxComponent({
    onChange,
  })

  input().click()
  input().click()

  expect(onChange).toBeCalledTimes(2)
})
