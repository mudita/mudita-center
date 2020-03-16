import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Card from "Renderer/components/rest/news/card/card.component"

test("should render header", () => {
  const { container } = renderWithThemeAndIntl(
    <Card
      header={"Example header"}
      imageSource={"http://placekitten.com/g/300/300"}
      url={"www.google.pl"}
      content={
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?"
      }
      count={30}
      communityLink={"www.google.pl"}
    />
  )
  const card = container.firstChild
  expect(card).toMatchSnapshot()
})
