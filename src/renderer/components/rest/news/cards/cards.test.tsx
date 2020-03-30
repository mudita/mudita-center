import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Cards from "Renderer/components/rest/news/cards/cards.component"

const cardsData = [
  {
    title: "Example header",
    imageSource: "http://placekitten.com/g/300/300",
    url: "https://www.google.com/",
    content: "Lorem ipsum dolor sit amet.",
    count: 2,
    communityLink: "https://www.google.com/",
  },
  {
    title: "Example header",
    imageSource: "http://placekitten.com/g/300/300",
    url: "https://www.google.com/",
    content: "Lorem ipsum dolor sit amet.",
    count: 2,
    communityLink: "https://www.google.com/",
  },
  {
    title: "Example header",
    imageSource: "http://placekitten.com/g/300/300",
    url: "https://www.google.com/",
    content: "Lorem ipsum dolor sit amet.",
    count: 2,
    communityLink: "https://www.google.com/",
  },
]

const moreThan3CardsData = [
  ...cardsData,
  {
    title: "Example header",
    imageSource: "http://placekitten.com/g/300/300",
    url: "https://www.google.com/",
    content: "Lorem ipsum dolor sit amet.",
    count: 2,
    communityLink: "https://www.google.com/",
  },
]

test("should render 3 cards", () => {
  const cardsTestId = "news-card"
  const { getAllByTestId } = renderWithThemeAndIntl(<Cards cards={cardsData} />)

  expect(getAllByTestId(cardsTestId)).toHaveLength(3)
})

test("should render 3 cards even when more than 3 elements are passed through props", () => {
  const cardsTestId = "news-card"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Cards cards={moreThan3CardsData} />
  )

  expect(getAllByTestId(cardsTestId)).toHaveLength(3)
})
