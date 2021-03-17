/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  getOutlookEndpoint,
  requestTokens,
} from "Renderer/models/external-providers/outlook/outlook.helpers"
import { OutLookScope } from "Renderer/models/external-providers/outlook/outlook.interface"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"

const scope = "offline_access, https://graph.microsoft.com/contacts.read"

let axiosMock = new MockAdapter(axios)

beforeEach(() => {
  axiosMock = new MockAdapter(axios)
})

test("requestTokens returns token", async () => {
  axiosMock.onPost().reply(200, {
    access_token: "token-123",
    refresh_token: "refresh_token-1234",
  })
  const tokens = await requestTokens("M.R3_BAY.123", scope)
  expect(tokens.access_token).toBe("token-123")
})

test("getOutlookEndpoint returns proper value", () => {
  expect(getOutlookEndpoint(OutLookScope.Contacts)).toBe(scope)
})
