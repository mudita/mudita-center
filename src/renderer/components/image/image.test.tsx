import "@testing-library/jest-dom/extend-expect"
import { cleanup } from "@testing-library/react"
import React from "react"
import Image from "Renderer/components/image/image.component"
import { renderWithTheme } from "Renderer/utils/renderWithTheme"

afterEach(cleanup)

test("should have passed alt and src", () => {
  const srcValue = "http://placekitten.com/g/200/300"
  const altValue = "Kitten"
  const { getByAltText } = renderWithTheme(
    <Image src={srcValue} alt={altValue} />
  )
  expect(getByAltText(altValue)).toHaveAttribute("alt", altValue)
  expect(getByAltText(altValue)).toHaveAttribute("src", srcValue)
})
