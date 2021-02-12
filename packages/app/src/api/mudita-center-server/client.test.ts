import { Client } from "App/api/mudita-center-server/client"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { MuditaCenterServerRoutes } from "App/api/mudita-center-server/mudita-center-server-routes"

let axiosMock = new MockAdapter(axios)

beforeEach(() => {
  axiosMock = new MockAdapter(axios)
})

test("returns news response properly", async () => {
  const data = {
    response: "ok",
  }
  axiosMock.onGet(`${process.env.MUDITA_CENTER_SERVER_URL as string}${MuditaCenterServerRoutes.News}`).reply(200, {
    data,
  })
  const client = new Client()
  const result = await client.getNews()
  expect(result).toStrictEqual({ data })
})


test("returns help response properly", async () => {
  const data = {
    response: "ok",
  }
  axiosMock.onGet(`${process.env.MUDITA_CENTER_SERVER_URL as string}${MuditaCenterServerRoutes.Help}`).reply(200, {
    data,
  })
  const client = new Client()
  const result = await client.getHelp({
    nextSyncToken: "dsad921342",
  })
  expect(result).toStrictEqual({ data })
})

test("returns 404 when no query is provided", () => {
  const client = new Client()
  expect(async () => {
    await client.getHelp({})
  }).rejects.toThrowError(
    `Error: Request failed with status code 404`
  )
})

