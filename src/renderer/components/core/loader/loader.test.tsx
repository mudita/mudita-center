import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"

test("returns css loader", () => {
  const testId = "loader-css"
  const { getByTestId } = renderWithThemeAndIntl(
    <Loader type={LoaderType.Css} />
  )
  expect(getByTestId(testId)).toBeInTheDocument()
})

test("returns gif loader", () => {
  const testId = "loader-gif"
  const { getByTestId } = renderWithThemeAndIntl(
    <Loader type={LoaderType.Gif} />
  )
  expect(getByTestId(testId)).toBeInTheDocument()
})
