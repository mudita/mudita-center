/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import UpdateButtonComponent from "Renderer/components/rest/news/update-button/update-button.component"
import { fireEvent } from "@testing-library/react"

test("calls function passed through props", async () => {
  const onUpdating = jest.fn()

  const { getByText } = renderWithThemeAndIntl(
    <UpdateButtonComponent onClick={onUpdating} />
  )

  const button = getByText("view.name.news.updateButtonLabel", { exact: false })

  fireEvent.click(button)

  expect(onUpdating).toHaveBeenCalled()
  expect(onUpdating).toHaveBeenCalledTimes(1)
})
