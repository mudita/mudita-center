import "@testing-library/jest-dom"
import React from "react"
import LoaderSpinner from "Renderer/components/core/loader/loader-spinner.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(<LoaderSpinner />)
  const loaderWrapperElement = container.firstChild
  expect(loaderWrapperElement).toMatchSnapshot()
})

test("loader has height and width based on size prop", () => {
  const { container } = renderWithThemeAndIntl(<LoaderSpinner />)
  const loaderWrapperElement = container.firstChild
  const expectedStyles = `
    height: 4rem;
    width: 4rem;
  `
  expect(loaderWrapperElement).toHaveStyle(expectedStyles)
})

test("renders correct amount of dots", () => {
  const { container } = renderWithThemeAndIntl(<LoaderSpinner />)

  const loaderDotsList = container.firstChild?.childNodes
  const defaultNumberOfDots = 6

  expect(loaderDotsList?.length).toEqual(defaultNumberOfDots)
})
