import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import CommunityCommentsCount from "Renderer/components/rest/news/card/community-comments-count.component"
import { intl } from "Renderer/utils/intl"

const communityLink = "https://mudita.com/"

test("displays loading info when comments are unknown", () => {
  const { container } = renderWithThemeAndIntl(
    <CommunityCommentsCount count={undefined} communityLink={communityLink} />
  )
  expect(container).toHaveTextContent(
    intl.formatMessage({
      id: "view.name.news.cardCommunityCommentsLoading",
    })
  )
})

test("displays the singular comment when count equals 1", () => {
  const { container } = renderWithThemeAndIntl(
    <CommunityCommentsCount count={1} communityLink={communityLink} />
  )
  expect(container).toHaveTextContent("view.name.news.cardCommunityComments")
})

test("displays the plural comment when count is > 1", () => {
  const count = 99999
  const { container } = renderWithThemeAndIntl(
    <CommunityCommentsCount
      count={count}
      communityLink={"https://mudita.com/"}
    />
  )
  expect(container).toHaveTextContent(
    intl.formatMessage(
      {
        id: "view.name.news.cardCommunityComments",
      },
      { count }
    )
  )
})

test("displays the lack of comments when there's none", () => {
  const count = 0
  const { container } = renderWithThemeAndIntl(
    <CommunityCommentsCount count={count} communityLink={communityLink} />
  )
  expect(container).toHaveTextContent(
    intl.formatMessage(
      {
        id: "view.name.news.cardCommunityComments",
      },
      { count }
    )
  )
})

test("header, content and comments text render in card", () => {
  const { container } = renderWithThemeAndIntl(
    <CommunityCommentsCount count={30} communityLink={communityLink} />
  )
  const link = container.querySelector("a")
  expect(link).toHaveAttribute("href", communityLink)
})
