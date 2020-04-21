import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Card from "Renderer/components/rest/news/card/card.component"

test("should render links with passed urls", () => {
  const url = "https://mudita.com/"
  const commuityUrl =
    "https://forum.mudita.com/t/mudita-pure-kickstarter-campaign-is-live/703"
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?"
  const { getByTestId } = renderWithThemeAndIntl(
    <Card
      title={"Example header"}
      imageSource={"http://placekitten.com/g/300/300"}
      url={url}
      content={content}
      count={30}
      communityLink={commuityUrl}
    />
  )
  const imageLink = getByTestId("image-link")
  const headerLink = getByTestId("header-link")
  const communityLink = getByTestId("community-link")
  expect(imageLink).toHaveAttribute("href", url)
  expect(headerLink).toHaveAttribute("href", url)
  expect(communityLink).toHaveAttribute("href", commuityUrl)
})

test("header, content and comments text render in card", () => {
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?"
  const headerText = "Lorem ipsum dolor."
  const commentsText = "30 Comments"
  const { getByTestId } = renderWithThemeAndIntl(
    <Card
      title={headerText}
      imageSource={"http://placekitten.com/g/300/300"}
      url={"https://mudita.com/"}
      content={content}
      count={30}
      communityLink={"https://mudita.com/"}
    />
  )

  expect(getByTestId("header-link")).toHaveTextContent(headerText)
  expect(getByTestId("community-link")).toHaveTextContent(commentsText)
  expect(getByTestId("content")).toHaveTextContent(content)
})
