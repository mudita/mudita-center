import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom"
import { waitFor } from "@testing-library/react"
import React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Button from "../button/button.component"
import { Type } from "Renderer/components/core/icon/icon.config"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <Dropdown toggler={<ButtonComponent />} />
  )
  expect(container).toMatchSnapshot()
})

test("renders toggler passed to component", () => {
  const buttonText = "Example"
  const { getByText } = renderWithThemeAndIntl(
    <Dropdown toggler={<ButtonComponent label={buttonText} />} />
  )
  expect(getByText(buttonText)).toBeInTheDocument()
})

test("renders dropdown", async () => {
  const buttonText = "Example"
  const { getByTestId, getByText, container } = renderWithThemeAndIntl(
    <Dropdown toggler={<ButtonComponent label={buttonText} />}>
      <Button
        displayStyle={DisplayStyle.Link1}
        label="I open Google in new tab"
        href="http://www.google.pl"
        target="_blank"
        Icon={Type.Upload}
      />
    </Dropdown>
  )

  fireEvent.click(getByText(buttonText))

  await waitFor(() => {
    expect(getByTestId("dropdown")).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

test("renders children", async () => {
  const buttonText = "Example"
  const childText = "childText"
  const { getByText } = renderWithThemeAndIntl(
    <Dropdown toggler={<ButtonComponent label={buttonText} />}>
      <Button
        displayStyle={DisplayStyle.Link1}
        label={childText}
        href="http://www.google.pl"
        target="_blank"
        Icon={Type.Upload}
      />
    </Dropdown>
  )

  fireEvent.click(getByText(buttonText))

  await waitFor(() => {
    expect(getByText(childText)).toBeInTheDocument()
  })
})
