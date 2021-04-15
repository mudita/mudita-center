import React, { ComponentProps } from "react"
import { renderWithTheme } from "../../utils/render-with-theme"
import { Radio } from "./radio.component"
import { RadioSize, TestId } from "./radio.enum"
import { getRadioLabelSpacing, getLabelTextVariant } from "./radio.helpers"
import { textVariants } from "../text/text.helpers"
import { getFontSize, theme } from "../../theme"
import { fireEvent } from "@testing-library/react"

const renderCheckboxComponent = (props: ComponentProps<typeof Radio>) => {
  const outcome = renderWithTheme(<Radio {...props} />)
  return {
    ...outcome,
    wrapper: () => outcome.queryByTestId(TestId.Wrapper),
    input: () => outcome.getByRole("radio"),
    customInput: () => outcome.queryByTestId(TestId.CustomInput),
    label: () => outcome.queryByTestId(TestId.BasicLabel),
    icon: () => outcome.queryByTestId(TestId.CheckedIcon),
  }
}

test("Default radio renders properly", () => {
  const { input, customInput, icon, label } = renderCheckboxComponent({})

  expect(input()).not.toBeChecked()
  expect(customInput()).toBeInTheDocument()
  expect(label()).not.toBeInTheDocument()
  expect(icon()).toBeInTheDocument()
  expect(icon()).not.toBeVisible()
})

test("Checked radio renders properly", () => {
  const { input, icon } = renderCheckboxComponent({
    checked: true,
    onChange: jest.fn,
  })

  expect(input()).toBeChecked()
  expect(icon()).toBeVisible()
})

test.each([
  [RadioSize.Small, 1.4],
  [RadioSize.Basic, 1.6],
  [RadioSize.Big, 2],
  [undefined, 1.6],
])("Checkbox size '%p' is rendered properly", (radioSize, expectedSize) => {
  const { customInput } = renderCheckboxComponent({
    size: radioSize,
  })

  expect(customInput()).toHaveStyleRule("width", `${expectedSize}rem`)
  expect(customInput()).toHaveStyleRule("height", `${expectedSize}rem`)
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

test.each([...Object.values(RadioSize), undefined])(
  "Basic label is styled properly for '%p' radio size",
  (radioSize) => {
    const { label } = renderCheckboxComponent({
      size: radioSize,
      label: "label",
    })

    const spacing = getRadioLabelSpacing(radioSize)
    expect(label()).toHaveStyleRule("margin-left", spacing)

    const variant = getLabelTextVariant(radioSize)
    const size = textVariants[variant].size
    if (size) {
      const fontSize = getFontSize(size)({ theme })
      expect(label()).toHaveStyleRule("font-size", fontSize)
    } else {
      expect(label()).not.toHaveStyleRule("font-size")
    }
  }
)

test("Clicking on a wrapper toggles radio properly", () => {
  const { wrapper, input } = renderCheckboxComponent({
    label: "label",
  })

  expect(input()).not.toBeChecked()
  fireEvent.click(wrapper() as Element)
})

test("Custom onChange function is passed properly", () => {
  const onChange = jest.fn()

  const { input } = renderCheckboxComponent({
    onChange,
  })

  input().click()

  expect(onChange).toBeCalledTimes(1)
})
