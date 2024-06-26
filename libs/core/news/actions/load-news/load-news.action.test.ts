/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { loadNews } from "Core/news/actions/load-news/load-news.action"
import { mockedNewsItems } from "Core/news/__mocks__/mocked-news-items"
import { NewsEvent } from "Core/news/constants"
import { AnyAction } from "redux"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

const offlineDataResponse = {
  newsItems: [mockedNewsItems[0]],
}

const updatedDataResponse = {
  newsItems: [...mockedNewsItems],
}

jest.mock("Core/news/requests/get-news.request", () => ({
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  getOfflineNews: jest.fn().mockImplementation(async () => offlineDataResponse),
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  getUpdatedNews: jest.fn().mockImplementation(async () => updatedDataResponse),
}))

describe("when there is an internet connection", () => {
  test("offline news and updated news are fetched and dispatched to reducer", async () => {
    const store = createMockStore([thunk])({
      appState: {
        online: true,
      },
      news: {
        newsItems: [],
      },
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await store.dispatch(loadNews() as unknown as AnyAction)

    expect(store.getActions()).toEqual([
      loadNews.pending(requestId, undefined),
      { type: NewsEvent.SetNews, payload: offlineDataResponse.newsItems },
      { type: NewsEvent.SetNews, payload: updatedDataResponse.newsItems },
      loadNews.fulfilled(undefined, requestId, undefined),
    ])
  })

  test("fetches and dispatches only updated news to the reducer when news items already exist", async () => {
    const store = createMockStore([thunk])({
      appState: {
        online: true,
      },
      news: {
        newsItems: mockedNewsItems,
      },
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await store.dispatch(loadNews() as unknown as AnyAction)

    expect(store.getActions()).toEqual([
      loadNews.pending(requestId, undefined),
      { type: NewsEvent.SetNews, payload: updatedDataResponse.newsItems },
      loadNews.fulfilled(undefined, requestId, undefined),
    ])
  })
})

describe("when the internet is disconnected", () => {
  test("only offline news are fetched and dispatched to reducer", async () => {
    const store = createMockStore([thunk])({
      appState: {
        online: false,
      },
      news: {
        newsItems: [],
      },
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await store.dispatch(loadNews() as unknown as AnyAction)

    expect(store.getActions()).toEqual([
      loadNews.pending(requestId, undefined),
      { type: NewsEvent.SetNews, payload: offlineDataResponse.newsItems },
      loadNews.fulfilled(undefined, requestId, undefined),
    ])
  })
})
