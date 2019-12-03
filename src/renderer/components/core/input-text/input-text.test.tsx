import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputText, {
  TextInputLayouts,
} from "Renderer/components/core/input-text/input-text.component"
import { icon } from "Renderer/components/core/input-text/input-text.stories"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("renders standard input properly", () => {
  const { getByRole, getByLabelText } = renderWithThemeAndIntl(<InputText />)

  expect(getByRole("textbox")).toBeInTheDocument()
  expect(getByLabelText("")).toBeInTheDocument()
})

test("renders outlined input properly", () => {
  const { getByRole } = renderWithThemeAndIntl(
    <InputText layout={TextInputLayouts.Outlined} />
  )

  expect(getByRole("textbox")).toBeInTheDocument()
})

test("renders outlined condensed input properly", () => {
  const { getByRole, container } = renderWithThemeAndIntl(
    <InputText layout={TextInputLayouts.Outlined} condensed />
  )

  expect(getByRole("textbox")).toBeInTheDocument()
  expect(container.querySelector("div")).toHaveStyle(`padding: 0 16px;`)
})

test("renders standard input with placeholder properly", () => {
  const { getByLabelText } = renderWithThemeAndIntl(
    <InputText placeholder="Placeholder" />
  )
  expect(getByLabelText("Placeholder")).toBeInTheDocument()
})

test("renders outlined input with placeholder properly", () => {
  const { getByPlaceholderText } = renderWithThemeAndIntl(
    <InputText layout={TextInputLayouts.Outlined} placeholder="Placeholder" />
  )
  expect(getByPlaceholderText("Placeholder")).toBeInTheDocument()
})

test("renders disabled standard input properly", () => {
  const { getByRole } = renderWithThemeAndIntl(<InputText disabled />)
  expect(getByRole("textbox")).toHaveAttribute("disabled")
})

test("renders disabled outlined input properly", () => {
  const { getByRole } = renderWithThemeAndIntl(
    <InputText layout={TextInputLayouts.Outlined} disabled />
  )
  expect(getByRole("textbox")).toHaveAttribute("disabled")
})

test("renders standard input with leading icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText leadingIcons={[icon]} />
  )
  expect(getByTestId("leading-icon-0")).toBeInTheDocument()
})

test("renders outlined input with leading icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText layout={TextInputLayouts.Outlined} leadingIcons={[icon]} />
  )
  expect(getByTestId("leading-icon-0")).toBeInTheDocument()
})

test("renders standard input with trailing icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText trailingIcons={[icon]} />
  )
  expect(getByTestId("trailing-icon-0")).toBeInTheDocument()
})

test("renders outlined input with trailing icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText layout={TextInputLayouts.Outlined} trailingIcons={[icon]} />
  )
  expect(getByTestId("trailing-icon-0")).toBeInTheDocument()
})

test("renders standard input with multiple icons properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText leadingIcons={[icon, icon]} trailingIcons={[icon, icon]} />
  )
  expect(getByTestId("leading-icon-0")).toBeInTheDocument()
  expect(getByTestId("leading-icon-1")).toBeInTheDocument()
  expect(getByTestId("trailing-icon-0")).toBeInTheDocument()
  expect(getByTestId("trailing-icon-1")).toBeInTheDocument()
})

test("renders outlined input with multiple icons properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText
      layout={TextInputLayouts.Outlined}
      leadingIcons={[icon, icon]}
      trailingIcons={[icon, icon]}
    />
  )
  expect(getByTestId("leading-icon-0")).toBeInTheDocument()
  expect(getByTestId("leading-icon-1")).toBeInTheDocument()
  expect(getByTestId("trailing-icon-0")).toBeInTheDocument()
  expect(getByTestId("trailing-icon-1")).toBeInTheDocument()
})
