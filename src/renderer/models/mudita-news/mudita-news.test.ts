import moxios from "moxios"
import { init } from "@rematch/core"
import muditaNews from "Renderer/models/mudita-news/mudita-news"
import { newsResponse } from "Renderer/models/mudita-news/mudita-news.fixtures"

beforeEach(() => {
  moxios.install()
})

afterEach(() => {
  moxios.uninstall()
})

it("call is performed after dispatching effect and gets initial state", () => {
  const store = init({
    models: { muditaNews },
  })

  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "muditaNews": Object {
        "commentsCount": Object {},
        "newsIds": Array [],
        "newsItems": Array [],
      },
    }
  `)
})

it("call is performed after dispatching effect with data", async () => {
  moxios.stubRequest(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=newsItem`,
    {
      status: 200,
      response: newsResponse,
    }
  )

  moxios.stubRequest(
    new RegExp(process.env.GATSBY_COMMUNITY_URL + "/t/\\d+\\.json"),
    {
      status: 200,
      response: {
        posts_count: "10",
      },
    }
  )

  const store = init({
    models: { muditaNews },
  })
  await store.dispatch.muditaNews.loadData()

  expect(store.getState()).toMatchSnapshot()
})
