/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { newsStateSelector } from "App/news/selectors/news-state/news-state.selector"
import { mockedNewsItems } from "App/news/__mocks__/mocked-news-items"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

test("news state is returned", () => {
  const state = {
    news: {
      newsItems: mockedNewsItems,
    },
    someOtherReducer: {
      someProperty: [],
    },
  } as unknown as ReduxRootState

  expect(newsStateSelector(state)).toEqual({
    newsItems: mockedNewsItems,
  })
})
