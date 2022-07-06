/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mockedNewsItems } from "App/news/__mocks__/mocked-news-items"
import { NewsEvent } from "App/news/constants"
import { SetNewsAction } from "App/news/reducers/news.interface"
import { initialState, newsReducer } from "App/news/reducers/news.reducer"

describe("set news functionality", () => {
  test("news are set properly", () => {
    const setNewsAction: SetNewsAction = {
      type: NewsEvent.SetNews,
      payload: mockedNewsItems,
    }

    expect(
      newsReducer(
        {
          ...initialState,
        },
        setNewsAction
      )
    ).toEqual({
      ...initialState,
      newsItems: mockedNewsItems,
    })
  })
})
