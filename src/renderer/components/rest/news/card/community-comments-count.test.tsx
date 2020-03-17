import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import CommunityCommentsCount from "Renderer/components/rest/news/card/community-comments-count.component"

describe("battery icon returns correct component", () => {
  const testScenario = [
    {
      count: 0,
      countString: "Be the first to comment",
    },
    {
      count: 123,
      countString: "123 Comments",
    },
    {
      count: 1,
      countString: "1 Comment",
    },
    {
      count: undefined,
      countString: "Loading comments...",
    },
  ]
  testScenario.forEach(({ count, countString }) => {
    test(`count: ${count}, countString: ${countString}`, () => {
      const { container } = renderWithThemeAndIntl(
        <CommunityCommentsCount count={count} />
      )
      expect(container).toHaveTextContent(countString)
    })
  })
})
