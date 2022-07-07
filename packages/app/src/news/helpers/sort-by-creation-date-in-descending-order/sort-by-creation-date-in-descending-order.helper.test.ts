/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "App/news/dto"
import { sortByCreationDateInDescendingOrder } from "./sort-by-creation-date-in-descending-order.helper"

const newsEntityMock: NewsEntry[] = [
  {
    category: "Blog",
    title: "Testing Mudita Pure",
    content:
      "Recently, our Team had the exciting opportunity to test Mudita Pure for an entire week.",
    image: {
      sys: undefined,
    },
    communityLink:
      "https://forum.mudita.com/t/youre-not-busy-youre-just-distracted/2734",
    link: "https://mudita.com/community/blog/were-not-that-busy-were-just-distracted/",
    discussionId: "2734",
    commentsCount: 2,
    date: "2021-07-09T08:25+00:00",
    newsId: "7ojDsiYeqKY6Xut2Bpliro",
    updatedAt: "2021-07-27T12:58:23.083Z",
    createdAt: "2021-07-27T12:58:23.083Z",
    imageAlt: "Pure testing videos",
    imageSource: "",
  },
  {
    category: "Blog",
    title: "Remote work",
    content:
      "What started as a way to keep employees safe, morphed into the world’s largest work-from-home experiment.",
    image: {
      sys: undefined,
    },
    communityLink: "https://forum.mudita.com/t/the-future-of-work/2632",
    link: "https://mudita.com/community/blog/is-remote-work-here-to-stay/",
    discussionId: "2632",
    commentsCount: 1,
    date: "2021-06-02T13:16+00:00",
    newsId: "3oanllPiOTmu6GD72CTZFD",
    updatedAt: "2021-07-27T13:07:31.243Z",
    createdAt: "2021-07-27T13:07:15.756Z",
    imageAlt: "Remote work",
    imageSource: "",
  },
]

test("returns sorted news entities", () => {
  const result = sortByCreationDateInDescendingOrder([...newsEntityMock])
  expect(result).toHaveLength(2)
  expect(result[0].newsId).toEqual(newsEntityMock[1].newsId)
  expect(result[1].newsId).toEqual(newsEntityMock[0].newsId)
})
