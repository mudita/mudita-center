/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import muditaNews from "App/__deprecated__/news/store/mudita-news"
import networkStatus from "App/__deprecated__/renderer/models/network-status/network-status"
import { ipcRenderer } from "electron-better-ipc"
import { NewsEvents } from "App/__deprecated__/main/functions/register-news-listener/register-news-listener"
import { newsItems } from "App/__deprecated__/news/components/cards/cards-mock-data"

const offlineDataResponse = {
  newsItems: [newsItems[0]],
  lastUpdate: "2020-04-28T11:23:22.696Z",
}

const onlineDataResponse = {
  newsItems: [...newsItems],
  lastUpdate: "2021-05-29T13:42:59.777Z",
}

afterEach(() => {
  ;(ipcRenderer as any).__rendererCalls = {}
})

test("call is performed after dispatching effect and gets initial state", () => {
  const store = init({
    models: { muditaNews },
  })

  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "muditaNews": Object {
        "newsItems": Array [],
      },
    }
  `)
})

describe("when network is connected", () => {
  test("online data is returned", async () => {
    const store = init({
      models: {
        muditaNews,
        networkStatus,
      },
    })
    ;(ipcRenderer as any).__rendererCalls = {
      [NewsEvents.GetCachedNews]: Promise.resolve(offlineDataResponse),
      [NewsEvents.GetUpdatedNews]: Promise.resolve(onlineDataResponse),
    }

    await store.dispatch.networkStatus.updateOnlineStatus()
    await store.dispatch.muditaNews.loadData("", store.getState())
    expect(store.getState()).toMatchSnapshot()
  })

  test("updating store data is called twice - for offline data and for online data", async () => {
    const dispatchMock = {
      muditaNews: {
        update: jest.fn(),
      },
    }

    const rootMock = {
      networkStatus: {
        online: true,
      },
    }

    ;(ipcRenderer as any).__rendererCalls = {
      [NewsEvents.GetCachedNews]: Promise.resolve(offlineDataResponse),
      [NewsEvents.GetUpdatedNews]: Promise.resolve(onlineDataResponse),
    }

    await (muditaNews as any)
      .effects(dispatchMock)
      .loadData(undefined, rootMock)

    expect(dispatchMock.muditaNews.update).toHaveBeenCalledTimes(2)
    expect(dispatchMock.muditaNews.update).toHaveBeenNthCalledWith(
      1,
      offlineDataResponse
    )
    expect(dispatchMock.muditaNews.update).toHaveBeenNthCalledWith(
      2,
      onlineDataResponse
    )
  })
})

describe("when network is not connected", () => {
  test("offline data is returned", async () => {
    const store = init({
      models: {
        muditaNews,
        networkStatus,
      },
    })
    ;(ipcRenderer as any).__rendererCalls = {
      [NewsEvents.GetCachedNews]: Promise.resolve(offlineDataResponse),
    }

    await store.dispatch.muditaNews.loadData("", store.getState())
    expect(store.getState()).toMatchSnapshot()
  })

  test("updating store data is called once", async () => {
    const dispatchMock = {
      muditaNews: {
        update: jest.fn(),
      },
    }

    const rootMock = {
      networkStatus: {
        online: false,
      },
    }

    ;(ipcRenderer as any).__rendererCalls = {
      [NewsEvents.GetCachedNews]: Promise.resolve(offlineDataResponse),
      [NewsEvents.GetUpdatedNews]: Promise.resolve(onlineDataResponse),
    }

    await (muditaNews as any)
      .effects(dispatchMock)
      .loadData(undefined, rootMock)

    expect(dispatchMock.muditaNews.update).toHaveBeenCalledTimes(1)
    expect(dispatchMock.muditaNews.update).toHaveBeenNthCalledWith(
      1,
      offlineDataResponse
    )
  })
})
