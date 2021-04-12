import React, { ComponentProps } from "react"
import { renderWithTheme } from "../../utils/render-with-theme"
import { Text } from "./text.component"
import { TextDecorator, TextVariant } from "./text.enum"
import { textVariants } from "./text.helpers"
import {
  Color,
  FontSize,
  FontWeight,
  getColor,
  getFontSize,
  getFontWeight,
  theme,
} from "../.."
import { RenderResult } from "@testing-library/react"

const testText = "Mudita is soo cool"

const renderTextComponent = (
  props: ComponentProps<typeof Text>
): RenderResult => {
  const outcome = renderWithTheme(<Text data-testid="text" {...props} />)
  return {
    ...outcome,
  }
}

test("Text component renders text properly", () => {
  const children = testText
  const { getByText } = renderTextComponent({ children })

  expect(getByText(testText)).toBeInTheDocument()
})

test("Text component renders children properly", () => {
  const children = <span>{testText}</span>
  const { getByText, container } = renderTextComponent({ children })

  expect(getByText(testText)).toBeInTheDocument()
  expect(container.getElementsByTagName("span")[0]).toBeInTheDocument()
})

test("Text component applies default styles properly", () => {
  const { getByTestId } = renderTextComponent({})

  expect(getByTestId("text")).toHaveStyleRule(
    "color",
    getColor("black")({ theme })
  )
  expect(getByTestId("text")).toHaveStyleRule(
    "font-size",
    getFontSize("16")({ theme })
  )
  expect(getByTestId("text")).toHaveStyleRule(
    "font-weight",
    getFontWeight("normal")({ theme })
  )
})

test("Text component applies custom tag properly", () => {
  const { container } = renderTextComponent({
    tag: "pre",
  })

  expect(container.getElementsByTagName("pre")[0]).toBeInTheDocument()
})

test("Text component applies custom color properly", () => {
  const { getByTestId } = renderTextComponent({
    variant: TextVariant.BasicGrey,
    color: "red",
  })

  expect(getByTestId("text")).toHaveStyleRule(
    "color",
    getColor("red")({ theme })
  )
})

test("Text component applies custom size properly", () => {
  const { getByTestId } = renderTextComponent({
    size: "24",
  })

  expect(getByTestId("text")).toHaveStyleRule(
    "font-size",
    getFontSize("24")({ theme })
  )
})

test("Text component applies custom weight properly", () => {
  const { getByTestId } = renderTextComponent({
    weight: "bold",
  })

  expect(getByTestId("text")).toHaveStyleRule(
    "font-weight",
    getFontWeight("bold")({ theme })
  )
})

test("Text component applies tag from variant properly", () => {
  const { container } = renderTextComponent({
    variant: TextVariant.HeadingPrimary,
  })

  expect(container.getElementsByTagName("h1")[0]).toBeInTheDocument()
})

test("Text component applies styles from variant properly", () => {
  const { getByTestId } = renderTextComponent({
    variant: TextVariant.SmallLightGrey,
  })

  expect(getByTestId("text")).toHaveStyleRule(
    "color",
    getColor(textVariants[TextVariant.SmallLightGrey].color as Color)({ theme })
  )
  expect(getByTestId("text")).toHaveStyleRule(
    "font-size",
    getFontSize(textVariants[TextVariant.SmallLightGrey].size as FontSize)({
      theme,
    })
  )
  expect(getByTestId("text")).toHaveStyleRule(
    "font-weight",
    getFontWeight(
      textVariants[TextVariant.SmallLightGrey].weight as FontWeight
    )({
      theme,
    })
  )
})

test("Text component applies styles from single decorator properly", () => {
  const { getByTestId } = renderTextComponent({
    variant: TextVariant.BasicGrey,
    decorators: [TextDecorator.Accent],
  })

  expect(getByTestId("text")).toHaveStyleRule(
    "color",
    getColor("blue500")({ theme })
  )
})

test("Text component applies styles from multiple decorators properly", () => {
  const { getByTestId } = renderTextComponent({
    variant: TextVariant.BasicGrey,
    decorators: [TextDecorator.Accent, TextDecorator.UpperCase],
  })

  expect(getByTestId("text")).toHaveStyleRule(
    "color",
    getColor("blue500")({ theme })
  )
  expect(getByTestId("text")).toHaveStyleRule("text-transform", "uppercase")
})
