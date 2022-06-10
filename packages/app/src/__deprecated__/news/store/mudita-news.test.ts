/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import muditaNews from "App/__deprecated__/news/store/mudita-news"
import networkStatus from "App/__deprecated__/renderer/models/network-status/network-status"
import { ipcRenderer } from "electron-better-ipc"
import { NewsEvents } from "App/__deprecated__/main/functions/register-news-listener"
import { newsItems } from "App/__deprecated__/news/components/cards/cards-mock-data"

afterEach(() => {
  ;(ipcRenderer as any).__rendererCalls = {}
})

it("call is performed after dispatching effect and gets initial state", () => {
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

it("call is performed after dispatching effect with data", async () => {
  const store = init({
    models: {
      muditaNews,
      networkStatus,
    },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [NewsEvents.Init]: Promise.resolve({
      newsItems,
      lastUpdate: "2020-04-28T11:23:22.696Z",
    }),
  }
  await store.dispatch.networkStatus.updateOnlineStatus()
  await store.dispatch.muditaNews.loadData("", store.getState())
  expect(store.getState()).toMatchSnapshot()
})
