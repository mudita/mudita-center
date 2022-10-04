/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Client } from "App/__deprecated__/api/mudita-center-server/client"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { MuditaCenterServerRoutes } from "App/__deprecated__/api/mudita-center-server/mudita-center-server-routes"

const previousEnvironment = { ...process.env }

beforeAll(() => {
  process.env = {
    ...previousEnvironment,
    MUDITA_CENTER_SERVER_URL: "http://localhost",
  }
})

afterAll(() => {
  process.env = {
    ...previousEnvironment,
  }
})

const axiosMock = new MockAdapter(axios)

test("returns news response properly", async () => {
  const data = {
    response: "ok",
  }
  axiosMock.onGet(MuditaCenterServerRoutes.News).replyOnce(200, {
    data,
  })
  const client = new Client()
  const result = await client.getNews({ limit: 3 })
  expect(result).toStrictEqual({ data: { response: "ok" } })
})

test("returns help response properly", async () => {
  const data = {
    response: "ok",
  }
  axiosMock.onGet(MuditaCenterServerRoutes.Help).replyOnce(200, {
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
  void expect(async () => {
    await client.getHelp({})
  }).rejects.toThrowError(`Error: Request failed with status code 404`)
})
