/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderHook, act } from "@testing-library/react-hooks"
import {
  ContactSupportModalKind,
  useContactSupport,
} from "Renderer/utils/contact-support/use-contact-support"
import { ipcRenderer } from "electron-better-ipc"
import { AppLogsEvents } from "App/main/functions/register-app-logs-listener"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"

const axiosMock = new MockAdapter(axios)
const OLD_ENV = process.env
const appLogs = "Example mudita app logs"
beforeEach(() => {
  ;(ipcRenderer as any).__rendererCalls = {
    [AppLogsEvents.Get]: Promise.resolve(appLogs),
  }
  jest.resetModules()
  process.env = { ...OLD_ENV }
})

afterAll(() => {
  process.env = OLD_ENV
})

test("initially all modals are closed", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useContactSupport())
  await act(waitForNextUpdate)
  expect(result.current.openModal).toStrictEqual({
    [ContactSupportModalKind.Contact]: false,
    [ContactSupportModalKind.Success]: false,
    [ContactSupportModalKind.Fail]: false,
  })
})

test("logs are appended correctly", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useContactSupport())
  await act(waitForNextUpdate)
  expect(result.current.log).toContain(appLogs)
})

test("success modal is opened when request is successful", async () => {
  process.env.CONTACT_SUPPORT_AUTH_KEY = "some-auth-key"
  axiosMock.onPost().reply(200)
  const { result } = renderHook(() => useContactSupport())
  await act(async () => {
    await result.current.sendForm({
      email: "hello@mudita.com",
      message: "Some message",
    })
  })
  expect(result.current.openModal[ContactSupportModalKind.Success]).toBeTruthy()
})

test("fail modal is opened when request failed", async () => {
  process.env.CONTACT_SUPPORT_AUTH_KEY = "some-auth-key"
  axiosMock.onPost().reply(400)
  const { result } = renderHook(() => useContactSupport())
  await act(async () => {
    await result.current.sendForm({
      email: "hello@mudita.com",
      message: "Some message",
    })
  })
  expect(result.current.openModal[ContactSupportModalKind.Fail]).toBeTruthy()
})
