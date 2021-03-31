import React, { ComponentProps } from "react"
import { renderWithTheme } from "Utils/render-with-theme"
import { Icon } from "Components/icon/icon.component"
import { IconSize, IconType } from "Components/icon/icon.enum"
import { iconSizes } from "Components/icon/icon.helpers"
import { getColor } from "Theme/theme-getters"
import { theme } from "Theme/theme-provider"

const renderIconComponent = (
  props: Omit<ComponentProps<typeof Icon>, "type">
) => {
  const outcome = renderWithTheme(
    <Icon data-testid="icon" {...props} type={IconType.CheckboxDropdown} />
  )
  return {
    ...outcome,
  }
}

test("Icon component renders properly", () => {
  const { getByTestId } = renderIconComponent({ width: 3 })

  expect(getByTestId("icon")).toBeInTheDocument()
  expect(getByTestId("svg")).toBeInTheDocument()
})

test("Icon component applies size properly", () => {
  const { getByTestId } = renderIconComponent({ size: IconSize.Big })

  expect(getByTestId("svg")).toHaveAttribute(
    "width",
    `${iconSizes[IconSize.Big]}rem`
  )
  expect(getByTestId("svg")).toHaveAttribute(
    "height",
    `${iconSizes[IconSize.Big]}rem`
  )
})

test("Icon component applies color properly", () => {
  const { getByTestId } = renderIconComponent({ color: "grey500" })

  expect(getByTestId("svg")).toHaveStyle(
    `color: ${getColor("grey500")({ theme })};`
  )
})

test("Icon component applies stretching properly", () => {
  const { getByTestId } = renderIconComponent({
    stretch: true,
    size: IconSize.Basic,
  })

  expect(getByTestId("svg")).toHaveAttribute("viewBox", "0 0 10 8")
})

test("Icon component applies no stretching properly", () => {
  const { getByTestId } = renderIconComponent({
    stretch: false,
    size: IconSize.Basic,
  })

  expect(getByTestId("svg")).toHaveAttribute("viewBox", "-5 -6 20 20")
})

test("Icon component applies custom width properly", () => {
  const { getByTestId } = renderIconComponent({
    width: 5,
  })

  expect(getByTestId("svg")).toHaveAttribute("width", "5rem")
  expect(getByTestId("svg")).toHaveAttribute("height", "5rem")
})

test("Icon component applies custom height properly", () => {
  const { getByTestId } = renderIconComponent({
    width: 5,
  })

  expect(getByTestId("svg")).toHaveAttribute("width", "5rem")
  expect(getByTestId("svg")).toHaveAttribute("height", "5rem")
})

test("Icon component applies custom width and height properly", () => {
  const { getByTestId } = renderIconComponent({
    width: 5,
    height: 4,
  })

  expect(getByTestId("svg")).toHaveAttribute("width", "5rem")
  expect(getByTestId("svg")).toHaveAttribute("height", "4rem")
})

test("Icon component custom width overrides size properly", () => {
  const { getByTestId } = renderIconComponent({
    size: IconSize.Big,
    width: 1,
  })

  expect(getByTestId("svg")).toHaveAttribute("width", "1rem")
  expect(getByTestId("svg")).toHaveAttribute(
    "height",
    `${iconSizes[IconSize.Big]}rem`
  )
})

test("Icon component custom height overrides size properly", () => {
  const { getByTestId } = renderIconComponent({
    size: IconSize.Big,
    height: 1,
  })

  expect(getByTestId("svg")).toHaveAttribute(
    "width",
    `${iconSizes[IconSize.Big]}rem`
  )
  expect(getByTestId("svg")).toHaveAttribute("height", "1rem")
})
