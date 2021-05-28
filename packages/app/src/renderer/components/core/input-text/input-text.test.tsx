/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import InputText from "Renderer/components/core/input-text/input-text.component"
import { Icon } from "Renderer/components/core/input-text/input-text.stories"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { InputTextTestIds } from "./input-text-test-ids.enum"

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

test("renders standard input with label properly", () => {
  const { getByLabelText } = renderWithThemeAndIntl(
    <InputText type="text" label="Label" />
  )
  expect(getByLabelText("Label")).toBeInTheDocument()
})

test("renders outlined input with label properly", () => {
  const { getByPlaceholderText } = renderWithThemeAndIntl(
    <InputText type="text" outlined label="Label" />
  )
  expect(getByPlaceholderText("Label")).toBeInTheDocument()
})

test("renders textarea with label properly", () => {
  const { getByPlaceholderText } = renderWithThemeAndIntl(
    <InputText type="textarea" label="Label" />
  )
  expect(getByPlaceholderText("Label")).toBeInTheDocument()
})

test("renders disabled standard input properly", () => {
  const { getByRole } = renderWithThemeAndIntl(
    <InputText type="text" disabled />
  )
  expect(getByRole("textbox")).toBeDisabled()
})

test("renders disabled outlined input properly", () => {
  const { getByRole } = renderWithThemeAndIntl(
    <InputText type="text" outlined disabled />
  )
  expect(getByRole("textbox")).toBeDisabled()
})

test("renders disabled textarea properly", () => {
  const { getByRole } = renderWithThemeAndIntl(
    <InputText type="textarea" disabled />
  )
  expect(getByRole("textbox")).toBeDisabled()
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

test("renders textarea input with multiple Icons properly", () => {
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

test("renders standard input error properly", () => {
  const { getByText } = renderWithThemeAndIntl(
    <InputText type="text" errorMessage={"Error"} />
  )
  expect(getByText("Error")).toBeInTheDocument()
})
test("renders textarea input error properly", () => {
  const { getByText } = renderWithThemeAndIntl(
    <InputText type="textarea" errorMessage={"Error"} />
  )
  expect(getByText("Error")).toBeInTheDocument()
})

test("renders password input properly", () => {
  const { getByTestId } = renderWithThemeAndIntl(<InputText type="password" />)

  expect(getByTestId(InputTextTestIds.PasswordInput)).toBeInTheDocument()
})
test("renders filled password input properly", () => {
  const { getByTestId, container } = renderWithThemeAndIntl(
    <InputText type="password" filled disabled />
  )
  expect(getByTestId(InputTextTestIds.PasswordInput)).toBeInTheDocument()
  expect(container.querySelector("input")).toHaveStyle(
    `background-color: #f4f5f6;`
  )
})
test("renders disabled error password input properly", () => {
  const { getByTestId, container } = renderWithThemeAndIntl(
    <InputText type="password" filled disabled error />
  )
  expect(getByTestId(InputTextTestIds.PasswordInput)).toBeInTheDocument()
  expect(container.querySelector("input")).toHaveStyle(
    `background-color: #fff; color: #e96a6a`
  )
})
