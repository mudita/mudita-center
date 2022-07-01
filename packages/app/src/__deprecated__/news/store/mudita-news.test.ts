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

afterEach(() => {
  ;(ipcRenderer as any).__rendererCalls = {}
})

const offlineData = [newsItems[0]]
const onlineData = [...newsItems]

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
      [NewsEvents.GetCachedNews]: Promise.resolve({
        newsItems: offlineData,
        lastUpdate: "2020-04-28T11:23:22.696Z",
      }),
      [NewsEvents.GetUpdatedNews]: Promise.resolve({
        newsItems: onlineData,
        lastUpdate: "2020-04-29T11:23:22.696Z",
      }),
    }

    await store.dispatch.networkStatus.updateOnlineStatus()
    await store.dispatch.muditaNews.loadData("", store.getState())
    expect(store.getState()).toMatchSnapshot()
  })
})

describe("when network is not connected", () => {
  test("offline data and returned", async () => {
    const store = init({
      models: {
        muditaNews,
        networkStatus,
      },
    })
    ;(ipcRenderer as any).__rendererCalls = {
      [NewsEvents.GetCachedNews]: Promise.resolve({
        newsItems: offlineData,
        lastUpdate: "2020-04-28T11:23:22.696Z",
      }),
      [NewsEvents.GetUpdatedNews]: Promise.resolve({
        newsItems: onlineData,
        lastUpdate: "2020-04-29T11:23:22.696Z",
      }),
    }

    await store.dispatch.muditaNews.loadData("", store.getState())
    expect(store.getState()).toMatchSnapshot()
  })
})
