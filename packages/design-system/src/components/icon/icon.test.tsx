import React from "react"
import { ComponentProps } from "react"
import { renderWithTheme } from "../../utils/render-with-theme"
import { Icon } from "./icon.component"
import { getColor, theme } from "../.."
import { RenderResult } from "@testing-library/react"

const renderIconComponent = (
  props: ComponentProps<typeof Icon>
): RenderResult => {
  const outcome = renderWithTheme(
    <Icon data-testid="icon" {...props}>
      <svg data-testid="svg">
        <rect x1={0} y1={0} x2={5} y2={5} />
      </svg>
    </Icon>
  )
  return {
    ...outcome,
  }
}

test("Icon component renders properly", () => {
  const { getByTestId } = renderIconComponent({})

  expect(getByTestId("icon")).toBeInTheDocument()
  expect(getByTestId("svg")).toBeInTheDocument()
})

test("Icon component applies color properly", () => {
  const { getByTestId } = renderIconComponent({ color: "grey500" })

  expect(getByTestId("svg")).toHaveStyle(
    `color: ${getColor("grey500")({ theme })};`
  )
})

test("Icon component applies default size properly", () => {
  const { getByTestId } = renderIconComponent({})

  expect(getByTestId("icon")).toHaveStyle("width: 2rem; height: 2rem;")
})

test("Icon component applies custom width properly", () => {
  const { getByTestId } = renderIconComponent({
    width: 5,
  })

  expect(getByTestId("icon")).toHaveStyle("width: 5rem")
})

test("Icon component applies custom height properly", () => {
  const { getByTestId } = renderIconComponent({
    height: 5,
  })

  expect(getByTestId("icon")).toHaveStyle("height: 5rem")
})

test("Icon component applies custom width and height properly", () => {
  const { getByTestId } = renderIconComponent({
    width: 5,
    height: 4,
  })

  expect(getByTestId("icon")).toHaveStyle("width: 5rem; height: 4rem;")
})
