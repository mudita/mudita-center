import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputText from "Renderer/components/core/input-text/input-text.component"
import { InputTextLayout } from "Renderer/components/core/input-text/input-text.inreface"
import { Icon } from "Renderer/components/core/input-text/input-text.stories"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("renders standard input properly", () => {
  const { getByRole, getByLabelText } = renderWithThemeAndIntl(<InputText />)

  expect(getByRole("textbox")).toBeInTheDocument()
  expect(getByLabelText("")).toBeInTheDocument()
})

test("renders outlined input properly", () => {
  const { getByRole } = renderWithThemeAndIntl(
    <InputText layout={InputTextLayout.Outlined} />
  )

  expect(getByRole("textbox")).toBeInTheDocument()
})

test("renders textarea properly", () => {
  const { getByRole } = renderWithThemeAndIntl(<InputText type="textarea" />)

  expect(getByRole("textbox")).toBeInTheDocument()
})

test("renders outlined condensed input properly", () => {
  const { getByRole, container } = renderWithThemeAndIntl(
    <InputText layout={InputTextLayout.Outlined} condensed />
  )

  expect(getByRole("textbox")).toBeInTheDocument()
  expect(container.querySelector("label")).toHaveStyle(`padding: 0 1.3rem;`)
})

test("renders standard input with placeholder properly", () => {
  const { getByLabelText } = renderWithThemeAndIntl(
    <InputText placeholder="Placeholder" />
  )
  expect(getByLabelText("Placeholder")).toBeInTheDocument()
})

test("renders outlined input with placeholder properly", () => {
  const { getByPlaceholderText } = renderWithThemeAndIntl(
    <InputText layout={InputTextLayout.Outlined} placeholder="Placeholder" />
  )
  expect(getByPlaceholderText("Placeholder")).toBeInTheDocument()
})

test("renders textarea with placeholder properly", () => {
  const { getByPlaceholderText } = renderWithThemeAndIntl(
    <InputText type="textarea" placeholder="Placeholder" />
  )
  expect(getByPlaceholderText("Placeholder")).toBeInTheDocument()
})

test("renders disabled standard input properly", () => {
  const { getByRole } = renderWithThemeAndIntl(<InputText disabled />)
  expect(getByRole("textbox")).toHaveAttribute("disabled")
})

test("renders disabled outlined input properly", () => {
  const { getByRole } = renderWithThemeAndIntl(
    <InputText layout={InputTextLayout.Outlined} disabled />
  )
  expect(getByRole("textbox")).toHaveAttribute("disabled")
})

test("renders disabled textarea properly", () => {
  const { getByRole } = renderWithThemeAndIntl(
    <InputText type="textarea" disabled />
  )
  expect(getByRole("textbox")).toHaveAttribute("disabled")
})

test("renders standard input with leading icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText leadingIcons={[<Icon key={1} />]} />
  )
  expect(getByTestId("leading-icon-0")).toBeInTheDocument()
})

test("renders outlined input with leading icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText
      layout={InputTextLayout.Outlined}
      leadingIcons={[<Icon key={1} />]}
    />
  )
  expect(getByTestId("leading-icon-0")).toBeInTheDocument()
})

test("renders textarea with leading icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText type="textarea" leadingIcons={[<Icon key={1} />]} />
  )
  expect(getByTestId("leading-icon-0")).toBeInTheDocument()
})

test("renders standard input with trailing icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText trailingIcons={[<Icon key={1} />]} />
  )
  expect(getByTestId("trailing-icon-0")).toBeInTheDocument()
})

test("renders outlined input with trailing icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText
      layout={InputTextLayout.Outlined}
      trailingIcons={[<Icon key={1} />]}
    />
  )
  expect(getByTestId("trailing-icon-0")).toBeInTheDocument()
})

test("renders textarea with trailing icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText type="textarea" trailingIcons={[<Icon key={1} />]} />
  )
  expect(getByTestId("trailing-icon-0")).toBeInTheDocument()
})

test("renders standard input with multiple Icons properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText
      leadingIcons={[<Icon key={1} />, <Icon key={2} />]}
      trailingIcons={[<Icon key={1} />, <Icon key={2} />]}
    />
  )
  expect(getByTestId("leading-icon-0")).toBeInTheDocument()
  expect(getByTestId("leading-icon-1")).toBeInTheDocument()
  expect(getByTestId("trailing-icon-0")).toBeInTheDocument()
  expect(getByTestId("trailing-icon-1")).toBeInTheDocument()
})

test("renders outlined input with multiple Icons properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText
      layout={InputTextLayout.Outlined}
      leadingIcons={[<Icon key={1} />, <Icon key={2} />]}
      trailingIcons={[<Icon key={1} />, <Icon key={2} />]}
    />
  )
  expect(getByTestId("leading-icon-0")).toBeInTheDocument()
  expect(getByTestId("leading-icon-1")).toBeInTheDocument()
  expect(getByTestId("trailing-icon-0")).toBeInTheDocument()
  expect(getByTestId("trailing-icon-1")).toBeInTheDocument()
})

test("renders outlined input with multiple Icons properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText
      type="textarea"
      leadingIcons={[<Icon key={1} />, <Icon key={2} />]}
      trailingIcons={[<Icon key={1} />, <Icon key={2} />]}
    />
  )
  expect(getByTestId("leading-icon-0")).toBeInTheDocument()
  expect(getByTestId("leading-icon-1")).toBeInTheDocument()
  expect(getByTestId("trailing-icon-0")).toBeInTheDocument()
  expect(getByTestId("trailing-icon-1")).toBeInTheDocument()
})
