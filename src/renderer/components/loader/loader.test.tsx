import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Loader from "Renderer/components/loader/loader.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("should match snapshot", () => {
  const { container } = renderWithThemeAndIntl(<Loader />)
  const loaderWrapperElement = container.firstChild
  expect(loaderWrapperElement).toMatchSnapshot()
})

test("loader should have height and width based on size prop", () => {
  const { container } = renderWithThemeAndIntl(<Loader />)
  const loaderWrapperElement = container.firstChild
  const expectedStyles = `
    height: 40px;
    width: 40px;
  `
  expect(loaderWrapperElement).toHaveStyle(expectedStyles)
})

test("loader should render correct amount of dots", () => {
  const { container } = renderWithThemeAndIntl(<Loader />)

  const loaderDotsList = container.firstChild?.childNodes
  const defaultNumberOfDots = 6

  expect(loaderDotsList?.length).toEqual(defaultNumberOfDots)
})
