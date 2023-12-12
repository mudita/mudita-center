/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { setNews } from "Core/news/actions"
import { mockedNewsItems } from "Core/news/__mocks__/mocked-news-items"
import { NewsEvent } from "Core/news/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

const mockStore = createMockStore([thunk])()

test("fire action with empty array and `SetBackupData` type", () => {
  mockStore.dispatch(setNews(mockedNewsItems))
  expect(mockStore.getActions()).toEqual([
    {
      type: NewsEvent.SetNews,
      payload: mockedNewsItems,
    },
  ])
})
