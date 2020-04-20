import { init } from "@rematch/core"
import muditaNews from "Renderer/models/mudita-news/mudita-news"
import { ipcRenderer } from "electron-better-ipc"
import { NewsEvents } from "App/main/functions/register-news-listener"
import { newsItems } from "Renderer/components/rest/news/cards/cards-mock-data"

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
    models: { muditaNews },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [NewsEvents.Init]: Promise.resolve({ newsItems }),
  }

  await store.dispatch.muditaNews.loadData()

  expect(store.getState()).toMatchSnapshot()
})
