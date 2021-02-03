import { Client } from "App/api/contentful/client"
import { ContentfulResource } from "App/api/contentful/contentful-resource.enum"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { ClientErrors } from "App/api/contentful/client-errors.enum"

let axiosMock = new MockAdapter(axios)

beforeEach(() => {
  axiosMock = new MockAdapter(axios)
})

test("return news response properly", async () => {
  const data = {
    response: "ok",
  }
  axiosMock.onPost(process.env.CONTENTFUL_LAMBDA).reply(200, {
    data,
  })
  const client = new Client({ resource: ContentfulResource.News })
  const result = await client.getEntries({ content_type: "newsItem" })
  expect(result).toStrictEqual({ data })
})

test("error is thrown when no content type is provided", () => {
  const client = new Client({ resource: ContentfulResource.News })
  expect(async () => {
    await client.getEntries({ content_type: "" })
  }).rejects.toThrowError(ClientErrors.InvalidContentType)
})

test("returns error when wrong resource was provided - news", () => {
  const client = new Client({ resource: ContentfulResource.Help })
  expect(async () => {
    await client.getEntries({ content_type: "type" })
  }).rejects.toThrowError(ClientErrors.InvalidResourceProvided)
})

test("return help response properly", async () => {
  const data = {
    response: "ok",
  }
  axiosMock.onPost(process.env.CONTENTFUL_LAMBDA).reply(200, {
    data,
  })
  const client = new Client({ resource: ContentfulResource.Help })
  const result = await client.sync({
    content_type: "helpItem",
    type: "Entry",
    locale: "en-US",
    initial: true,
  })
  expect(result).toStrictEqual({ data })
})

test("return 404 when no query is provided", () => {
  const client = new Client({ resource: ContentfulResource.Help })
  expect(async () => {
    await client.sync({})
  }).rejects.toThrowError(
    `${ClientErrors.InvalidQuery}: Error: Request failed with status code 404`
  )
})

test("returns error when wrong resource was provided - help", () => {
  const client = new Client({ resource: ContentfulResource.News })
  expect(async () => {
    await client.sync({})
  }).rejects.toThrowError(ClientErrors.InvalidResourceProvided)
})
