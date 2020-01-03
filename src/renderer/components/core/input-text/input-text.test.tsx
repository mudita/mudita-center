import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputText from "Renderer/components/core/input-text/input-text.component"
import { Icon } from "Renderer/components/core/input-text/input-text.stories"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("renders standard input properly", () => {
  const { getByRole, getByLabelText } = renderWithThemeAndIntl(
    <InputText type="text" />
  )

  expect(getByRole("textbox")).toBeInTheDocument()
  expect(getByLabelText("")).toBeInTheDocument()
})

test("renders outlined input properly", () => {
  const { getByRole } = renderWithThemeAndIntl(
    <InputText type="text" outlined />
  )

  expect(getByRole("textbox")).toBeInTheDocument()
})

test("renders textarea properly", () => {
  const { getByRole } = renderWithThemeAndIntl(<InputText type="textarea" />)

  expect(getByRole("textbox")).toBeInTheDocument()
})

test("renders outlined condensed input properly", () => {
  const { getByRole, container } = renderWithThemeAndIntl(
    <InputText type="text" outlined condensed />
  )

  expect(getByRole("textbox")).toBeInTheDocument()
  expect(container.querySelector("label")).toHaveStyle(`padding: 0 1.3rem;`)
})

test("renders standard input with placeholder properly", () => {
  const { getByLabelText } = renderWithThemeAndIntl(
    <InputText type="text" placeholder="Placeholder" />
  )
  expect(getByLabelText("Placeholder")).toBeInTheDocument()
})

test("renders outlined input with placeholder properly", () => {
  const { getByPlaceholderText } = renderWithThemeAndIntl(
    <InputText type="text" outlined placeholder="Placeholder" />
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
  const { getByRole } = renderWithThemeAndIntl(
    <InputText type="text" disabled />
  )
  expect(getByRole("textbox")).toHaveAttribute("disabled")
})

test("renders disabled outlined input properly", () => {
  const { getByRole } = renderWithThemeAndIntl(
    <InputText type="text" outlined disabled />
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
    <InputText type="text" leadingIcons={[<Icon key={1} />]} />
  )
  expect(getByTestId("leading-icon-0")).toBeInTheDocument()
})

test("renders outlined input with leading icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText type="text" outlined leadingIcons={[<Icon key={1} />]} />
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
    <InputText type="text" trailingIcons={[<Icon key={1} />]} />
  )
  expect(getByTestId("trailing-icon-0")).toBeInTheDocument()
})

test("renders outlined input with trailing icon properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <InputText type="text" outlined trailingIcons={[<Icon key={1} />]} />
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
      type="text"
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
      type="text"
      outlined
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
