import React, { ComponentProps } from "react"
import { renderWithTheme } from "../../utils/render-with-theme"
import { Checkbox } from "./checkbox.component"
import { CheckboxSize, TestId } from "./checkbox.enum"
import {
  getCheckboxLabelSpacing,
  getCheckboxSize,
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
    label: () => outcome.queryByTestId(TestId.Label),
    icon: () => outcome.queryByTestId(TestId.Icon),
  }
}

test("Default checkbox renders properly", () => {
  const {
    input,
    checkedIcon,
    indeterminateIcon,
    label,
    icon,
  } = renderCheckboxComponent({})

  expect(input()).not.toBeChecked()
  expect(checkedIcon()).not.toBeVisible()
  expect(indeterminateIcon()).not.toBeVisible()
  expect(label()).not.toBeInTheDocument()

  const size = getCheckboxSize(undefined)

  expect(icon()).toHaveStyleRule("width", `${size}rem`)
  expect(icon()).toHaveStyleRule("height", `${size}rem`)
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

test("Default label renders properly", () => {
  const { getByText, label } = renderCheckboxComponent({
    children: "Test label",
  })

  expect(label()).not.toBeInTheDocument()
  expect(getByText("Test label")).toBeInTheDocument()
})

test("Simple styled label renders properly", () => {
  const { getByText, label } = renderCheckboxComponent({
    children: "Test label",
    simpleLabel: true,
  })

  expect(label()).toBeInTheDocument()
  expect(getByText("Test label")).toBeInTheDocument()
})

test("Custom label renders properly", () => {
  const customLabel = <span>Custom label</span>
  const { getByText, label } = renderCheckboxComponent({
    children: customLabel,
  })

  expect(label()).not.toBeInTheDocument()
  expect(getByText("Custom label")).toBeInTheDocument()
})

test("Checkbox size 'small' is rendered properly", () => {
  const { icon } = renderCheckboxComponent({
    size: CheckboxSize.Small,
  })

  const size = getCheckboxSize(CheckboxSize.Small)
  expect(icon()).toHaveStyleRule("width", `${size}rem`)
  expect(icon()).toHaveStyleRule("height", `${size}rem`)
})

test("Checkbox size 'basic' is rendered properly", () => {
  const { icon } = renderCheckboxComponent({ size: CheckboxSize.Basic })

  const size = getCheckboxSize(CheckboxSize.Basic)

  expect(icon()).toHaveStyleRule("width", `${size}rem`)
  expect(icon()).toHaveStyleRule("height", `${size}rem`)
})

test("Checkbox size 'big' is rendered properly", () => {
  const { icon } = renderCheckboxComponent({ size: CheckboxSize.Big })

  const size = getCheckboxSize(CheckboxSize.Big)

  expect(icon()).toHaveStyleRule("width", `${size}rem`)
  expect(icon()).toHaveStyleRule("height", `${size}rem`)
})

test("Simple label is styled properly depending on checkbox size", () => {
  const size = CheckboxSize.Big

  const { label } = renderCheckboxComponent({
    size,
    children: "label",
    simpleLabel: true,
  })

  const variant = getLabelTextVariant(size)
  const fontSize = getFontSize(textVariants[variant].size || "16")({ theme })
  const spacing = getCheckboxLabelSpacing(size)

  expect(label()).toHaveStyleRule("font-size", fontSize)
  expect(label()).toHaveStyleRule("margin-left", spacing)
})

test("Clicking on a wrapper toggles checkbox properly", () => {
  const { wrapper, input } = renderCheckboxComponent({
    children: "label",
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
