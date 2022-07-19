/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import UpdateButtonComponent from "App/__deprecated__/renderer/components/rest/news/update-button/update-button.component"
import { fireEvent } from "@testing-library/react"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/require-await
test("calls function passed through props", async () => {
  const onUpdating = jest.fn()

  const { getByText } = renderWithThemeAndIntl(
    <UpdateButtonComponent onClick={onUpdating} />
  )

  const button = getByText("module.news.updateButtonLabel", { exact: false })

  fireEvent.click(button)

  expect(onUpdating).toHaveBeenCalled()
  expect(onUpdating).toHaveBeenCalledTimes(1)
})
