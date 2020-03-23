import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ProductCard from "Renderer/components/rest/news/product-card/product-card.component"

test("image and button receive correct url", () => {
  const linkId = "image-link"
  const buttonId = "button-link"
  const url = "https://mudita.com/"
  const { getByTestId } = renderWithThemeAndIntl(<ProductCard url={url} />)
  expect(getByTestId(linkId)).toHaveAttribute("href", url)
  expect(getByTestId(buttonId)).toHaveAttribute("href", url)
})

test("title, subtitle and label receive correct props values", () => {
  const title = "Example title"
  const subtitle = "Example subtitle"
  const label = "Example label"

  const { getByText } = renderWithThemeAndIntl(
    <ProductCard title={title} subtitle={subtitle} label={label} />
  )

  expect(getByText(title)).toHaveTextContent(title)
  expect(getByText(subtitle)).toHaveTextContent(subtitle)
  expect(getByText(label)).toHaveTextContent(label)
})

test("render correct amount of elements", () => {
  const listElements = [
    "Acoustic music",
    "Uplifting lyrics",
    "We've made it our manifesto",
  ]

  const { container } = renderWithThemeAndIntl(
    <ProductCard featuresElements={listElements} />
  )

  const liElements = container.querySelectorAll("li")

  expect(liElements).toHaveLength(3)
})

test("renders notification when connected", () => {
  const notificationId = "card-notification"
  const { getByTestId } = renderWithThemeAndIntl(<ProductCard connected />)

  expect(getByTestId(notificationId)).toBeInTheDocument()
})
