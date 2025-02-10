/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { MuditaCenterServerRoutes } from "shared/utils"
import { Client } from "Core/__deprecated__/api/mudita-center-server/client"

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
