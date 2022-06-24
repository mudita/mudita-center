/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom"
import React from "react"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import Dropdown from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import Button from "../button/button.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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

test("renders dropdown", () => {
  const buttonText = "Example"
  const { getByTestId, getByText, container } = renderWithThemeAndIntl(
    <Dropdown toggler={<ButtonComponent label={buttonText} />}>
      <Button
        displayStyle={DisplayStyle.Link}
        label="I open Google in new tab"
        href="http://www.google.pl"
        target="_blank"
        Icon={IconType.Upload}
      />
    </Dropdown>
  )

  fireEvent.click(getByText(buttonText))

  expect(getByTestId("dropdown")).toBeVisible()
  expect(container).toMatchSnapshot()
})

test("renders children", () => {
  const buttonText = "Example"
  const childText = "childText"
  const { getByText } = renderWithThemeAndIntl(
    <Dropdown toggler={<ButtonComponent label={buttonText} />}>
      <Button
        displayStyle={DisplayStyle.Link}
        label={childText}
        href="http://www.google.pl"
        target="_blank"
        Icon={IconType.Upload}
      />
    </Dropdown>
  )

  fireEvent.click(getByText(buttonText))

  expect(getByText(childText)).toBeVisible()
})
