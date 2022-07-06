/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { loadNews } from "App/news/actions/load-news/load-news.action"
import { mockedNewsItems } from "App/news/__mocks__/mocked-news-items"
import { NewsEvent } from "App/news/constants"
import { AnyAction } from "redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

const offlineDataResponse = {
  newsItems: [mockedNewsItems[0]],
}

const updatedDataResponse = {
  newsItems: [...mockedNewsItems],
}

jest.mock("App/news/requests/get-news.request", () => ({
  getOfflineNews: jest.fn().mockImplementation(async () => offlineDataResponse),
  getUpdatedNews: jest.fn().mockImplementation(async () => updatedDataResponse),
}))

describe("when there is an internet connection", () => {
  test("offline news and updated news are fetched and dispatched to reducer", async () => {
    const store = createMockStore([thunk])({
      networkStatus: {
        online: true,
      },
    })
    const {
      meta: { requestId },
    } = await store.dispatch(loadNews() as unknown as AnyAction)

    expect(store.getActions()).toEqual([
      loadNews.pending(requestId, undefined),
      { type: NewsEvent.SetNews, payload: offlineDataResponse.newsItems },
      { type: NewsEvent.SetNews, payload: updatedDataResponse.newsItems },
      loadNews.fulfilled(undefined, requestId, undefined),
    ])
  })
})
describe("when the internet is disconnected", () => {
  test("only offline news are fetched and dispatched to reducer", async () => {
    const store = createMockStore([thunk])({
      networkStatus: {
        online: false,
      },
    })
    const {
      meta: { requestId },
    } = await store.dispatch(loadNews() as unknown as AnyAction)

    expect(store.getActions()).toEqual([
      loadNews.pending(requestId, undefined),
      { type: NewsEvent.SetNews, payload: offlineDataResponse.newsItems },
      loadNews.fulfilled(undefined, requestId, undefined),
    ])
  })
})
