/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { initialState, newsReducer } from "App/news/reducers"
import { newsSortedByCreationDateSelector } from "App/news/selectors/news-sorted-by-creation-date/news-sorted-by-creation-date.selector"
import { mockedNewsItems } from "App/news/__mocks__/mocked-news-items"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

const newsToBeSorted = [
  {
    ...mockedNewsItems[0],
    createdAt: "2019-07-11T09:48:32.097Z",
  },
  {
    ...mockedNewsItems[1],
    createdAt: "2022-07-11T09:48:32.097Z",
  },
  {
    ...mockedNewsItems[2],
    createdAt: "2013-07-11T09:48:32.097Z",
  },
]

const newsInCorrectOrder = [
  newsToBeSorted[1],
  newsToBeSorted[0],
  newsToBeSorted[2],
]

test("returns news sorted by creation date in descending order", () => {
  const state = {
    news: newsReducer(
      {
        ...initialState,
        newsItems: newsToBeSorted,
      },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as any
    ),
  } as ReduxRootState

  expect(newsSortedByCreationDateSelector(state)).toEqual(newsInCorrectOrder)
})
