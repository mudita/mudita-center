import React, { ComponentProps } from "react"
import { renderWithTheme } from "Utils/render-with-theme"
import { Icon } from "Components/icon/icon.component"
import { getColor } from "Theme/theme-getters"
import { theme } from "Theme/theme-provider"
import { IconType } from "Icons"

const renderIconComponent = (
  props: Omit<ComponentProps<typeof Icon>, "type">
) => {
  const outcome = renderWithTheme(<Icon data-testid="wrapper" {...props} />)
  return {
    ...outcome,
  }
}

test("Icon component renders properly", () => {
  const { getByTestId } = renderIconComponent({
    children: IconType.CheckboxChecked,
  })

  expect(getByTestId("wrapper")).toBeInTheDocument()
  expect(getByTestId("wrapper")).toHaveTextContent(IconType.CheckboxChecked)

  expect(getByTestId("wrapper")).toHaveStyle("color: inherit;")
  expect(getByTestId("wrapper")).toHaveStyle("font-size: 2rem;")
})

test("Icon component applies color properly", () => {
  const { getByTestId } = renderIconComponent({
    color: "grey500",
  })

  expect(getByTestId("wrapper")).toHaveStyle(
    `color: ${getColor("grey500")({ theme })};`
  )
})

test("Icon component applies custom size properly", () => {
  const { getByTestId } = renderIconComponent({
    size: 5,
  })

  expect(getByTestId("wrapper")).toHaveStyle("font-size: 5rem")
})
