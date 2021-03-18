/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { TokenRequester } from "Renderer/models/external-providers/outlook/token-requester"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { OutLookScope } from "Renderer/models/external-providers/outlook/outlook.interface"

const axiosInstance = axios.create()
let axiosMock = new MockAdapter(axiosInstance, { onNoMatch: "throwException" })

beforeEach(() => {
  axiosMock = new MockAdapter(axiosInstance, { onNoMatch: "throwException" })
})

test("should return tokens", async () => {
  const data = {
    access_token: "lala",
    refresh_token: "ASdsa",
  }
  axiosMock
    .onPost("https://login.microsoftonline.com/common/oauth2/v2.0/token")
    .replyOnce(200, data)
  const tokenRequester = new TokenRequester(axiosInstance)
  const result = await tokenRequester.requestTokens(
    "https://login.microsoftonline.com/common/oauth2/v2.0/",
    OutLookScope.Contacts
  )
  expect(result).toEqual({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  })
})

test("returns regenerated tokens", async () => {
  const data = {
    access_token: "token",
    refresh_token: "refresh",
  }
  axiosMock
    .onPost("https://login.microsoftonline.com/common/oauth2/v2.0/token")
    .replyOnce(200, data)
  const tokenRequester = new TokenRequester(axiosInstance)
  const result = await tokenRequester.regenerateTokens(
    "token",
    OutLookScope.Contacts
  )
  expect(result).toEqual({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  })
})
