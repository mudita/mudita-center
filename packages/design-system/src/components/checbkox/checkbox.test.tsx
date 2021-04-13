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
    basicLabel: () => outcome.queryByTestId(TestId.BasicLabel),
    icon: () => outcome.queryByTestId(TestId.Icon),
  }
}

test("Default checkbox renders properly", () => {
  const {
    input,
    checkedIcon,
    indeterminateIcon,
    basicLabel,
  } = renderCheckboxComponent({})

  expect(input()).not.toBeChecked()
  expect(checkedIcon()).not.toBeVisible()
  expect(indeterminateIcon()).not.toBeVisible()
  expect(basicLabel()).not.toBeInTheDocument()
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
  const { getByText, basicLabel } = renderCheckboxComponent({
    children: "Test label",
  })

  expect(basicLabel()).not.toBeInTheDocument()
  expect(getByText("Test label")).toBeInTheDocument()
})

test("Basic label renders properly", () => {
  const { getByText, basicLabel } = renderCheckboxComponent({
    children: "Test label",
    basicLabelStyle: true,
  })

  expect(basicLabel()).toBeInTheDocument()
  expect(getByText("Test label")).toBeInTheDocument()
})

test.each([...Object.values(CheckboxSize), undefined])(
  "Checkbox size '%p' is rendered properly",
  (checkboxSize) => {
    const { icon } = renderCheckboxComponent({
      size: checkboxSize,
    })

    const size = getCheckboxSize(checkboxSize)
    expect(icon()).toHaveStyleRule("width", `${size}rem`)
    expect(icon()).toHaveStyleRule("height", `${size}rem`)
  }
)

test.each([...Object.values(CheckboxSize), undefined])(
  "Basic label is styled properly for '%p' checkbox size",
  (checkboxSize) => {
    const { basicLabel } = renderCheckboxComponent({
      size: checkboxSize,
      children: "label",
      basicLabelStyle: true,
    })

    const variant = getLabelTextVariant(checkboxSize)
    const spacing = getCheckboxLabelSpacing(checkboxSize)
    expect(basicLabel()).toHaveStyleRule("margin-left", spacing)

    const size = textVariants[variant].size
    if (size) {
      const fontSize = getFontSize(size)({ theme })
      expect(basicLabel()).toHaveStyleRule("font-size", fontSize)
    } else {
      expect(basicLabel()).not.toHaveStyleRule("font-size")
    }
  }
)

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
