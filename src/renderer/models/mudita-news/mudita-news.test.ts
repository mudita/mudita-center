import axios from "axios"
import { init } from "@rematch/core"
import muditaNews from "Renderer/models/mudita-news/mudita-news"

it("call is performed after dispatching effect", async () => {
  const expectedResult = [
    {
      title: "title",
    },
    {
      title: "title",
    },
  ]
  const mock = jest.spyOn(axios, "get")
  const mockedPromise = Promise.resolve({ data: expectedResult })
  mock.mockReturnValueOnce(mockedPromise)

  const store = init({
    models: { muditaNews },
  })

  await store.dispatch.muditaNews.loadData()

  expect(mock).toHaveBeenCalled()
  expect(store.getState()).toEqual({
    muditaNews: {
      newsItems: expectedResult,
    },
  })

  mock.mockRestore()
})
