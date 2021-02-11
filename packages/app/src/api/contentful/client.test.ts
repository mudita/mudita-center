import { Client } from "App/api/contentful/client"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { ClientErrors } from "App/api/contentful/client-errors.enum"
import { MuditaCenterServerResource } from "App/api/contentful/contentful-resource.enum"

let axiosMock = new MockAdapter(axios)

beforeEach(() => {
  axiosMock = new MockAdapter(axios)
})

test("return news response properly", async () => {
  const data = {
    response: "ok",
  }
  axiosMock.onGet(`${process.env.MUDITA_CENTER_SERVER_URL as string}${MuditaCenterServerResource.News}`).reply(200, {
    data,
  })
  const client = new Client()
  const result = await client.getNews()
  expect(result).toStrictEqual({ data })
})


test("return help response properly", async () => {
  const data = {
    response: "ok",
  }
  axiosMock.onGet(`${process.env.MUDITA_CENTER_SERVER_URL as string}${MuditaCenterServerResource.Help}`).reply(200, {
    data,
  })
  const client = new Client()
  const result = await client.getHelp({
    nextSyncToken: "dsad921342",
  })
  expect(result).toStrictEqual({ data })
})

test("return 404 when no query is provided", () => {
  const client = new Client()
  expect(async () => {
    await client.getHelp({})
  }).rejects.toThrowError(
    `${ClientErrors.InvalidQuery}: Error: Request failed with status code 404`
  )
})

