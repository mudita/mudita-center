import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import CommunityCommentsCount from "Renderer/components/rest/news/card/community-comments-count.component"

test("displays loading info when comments are unknown", () => {
  const { container } = renderWithThemeAndIntl(
    <CommunityCommentsCount count={undefined} />
  )
  expect(container).toHaveTextContent("Loading comments...")
})

test("displays the singular comment when count equals 1", () => {
  const { container } = renderWithThemeAndIntl(
    <CommunityCommentsCount count={1} />
  )
  expect(container).toHaveTextContent("1 Comment")
})

test("displays the plural comment when count is > 1", () => {
  const { container } = renderWithThemeAndIntl(
    <CommunityCommentsCount count={99999} />
  )
  expect(container).toHaveTextContent("99,999 Comments")
})

test("displays the lack of comments when there's none", () => {
  const { container } = renderWithThemeAndIntl(
    <CommunityCommentsCount count={0} />
  )
  expect(container).toHaveTextContent("Be the first to comment")
})
