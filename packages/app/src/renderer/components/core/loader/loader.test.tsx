/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"

test("returns css loader", () => {
  const testId = "loader-spinner"
  const { getByTestId } = renderWithThemeAndIntl(
    <Loader type={LoaderType.Spinner} />
  )
  expect(getByTestId(testId)).toBeInTheDocument()
})

test("returns logo loader", () => {
  const testId = "loader-logo"
  const { getByTestId } = renderWithThemeAndIntl(
    <Loader type={LoaderType.Logo} />
  )
  expect(getByTestId(testId)).toBeInTheDocument()
})
