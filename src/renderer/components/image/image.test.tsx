import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Image from "Renderer/components/image/image.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("should have passed alt and src", () => {
  const srcValue = "http://placekitten.com/g/200/300"
  const altValue = "Kitten"
  const { getByAltText } = renderWithThemeAndIntl(
    <Image src={srcValue} alt={altValue} />
  )
  expect(getByAltText(altValue)).toHaveAttribute("alt", altValue)
  expect(getByAltText(altValue)).toHaveAttribute("src", srcValue)
})
