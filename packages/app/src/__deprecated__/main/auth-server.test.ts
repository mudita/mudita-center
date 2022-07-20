/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 *
 * App should be disabled during tests
 * @jest-environment node
 */

import axios from "axios"
import {
  killAuthServer,
  authServerPort,
  createAuthServer,
} from "App/__deprecated__/main/auth-server"
import { noop } from "App/__deprecated__/renderer/utils/noop"

afterEach(() => {
  killAuthServer()
})

test("server should not be available without starting it manually", async () => {
  await expect(
    async () => await axios.post(`http://localhost:${authServerPort}`)
  ).rejects.toThrow()
})

test("server should start using `createAuthServer`", async () => {
  createAuthServer(noop)

  const { status } = await axios.post(`http://localhost:${authServerPort}`)
  expect(status).toBe(200)
})

test("server should return an error when method is not POST", async () => {
  createAuthServer(noop)

  await expect(
    async () => await axios.get(`http://localhost:${authServerPort}`)
  ).rejects.toThrowError(Error("Request failed with status code 400"))
})

test("server should run the callback function", async () => {
  const callback = jest.fn()
  createAuthServer(callback)

  await axios.post(`http://localhost:${authServerPort}`)
  await expect(callback).toBeCalled()
})
