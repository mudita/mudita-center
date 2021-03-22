/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { init } from "@rematch/core"
import { OutlookAuthActions } from "Common/enums/outlook-auth-actions.enum"
import outlook from "Renderer/models/external-providers/outlook/outlook"
import { OutLookScope } from "Renderer/models/external-providers/outlook/outlook.interface"

const authData = {
  access_token: "token-123",
  refresh_token: "refresh-token-123",
}

const initStore = () => {
  return init({
    models: { outlook },
  })
}

let store = initStore()

beforeEach(() => {
  store = initStore()
  jest.resetModules()
})

const rejectedError = { error: "some error" }

jest.mock(
  "electron-better-ipc",
  () => {
    const mockIpcRenderer = {
      callMain: (channel: OutlookAuthActions) => {
        switch (channel) {
          case OutlookAuthActions.OpenWindow:
            return jest.fn()
          default:
            return false
        }
      },
      answerMain: (
        channel: OutlookAuthActions,
        callback: (data: any) => PromiseLike<any>
      ) => {
        switch (channel) {
          case OutlookAuthActions.GotCredentials:
            callback(rejectedError)
            return true
          default:
            return false
        }
      },
    }
    return { ipcRenderer: mockIpcRenderer }
  },
  { virtual: true }
)

test("store returns initial state", () => {
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "outlook": Object {
        "calendars": Object {},
        "contacts": Object {},
      },
    }
  `)
})

test("authorization handles error properly", async () => {
  await expect(store.dispatch.outlook.authorize("contacts")).rejects.toMatch(
    rejectedError.error
  )
})

test("auth data is set properly", () => {
  store.dispatch.outlook.setAuthData({
    data: authData,
    scope: OutLookScope.Contacts,
  })
  expect(store.getState().outlook.contacts).toMatchInlineSnapshot(`
    Object {
      "access_token": "token-123",
      "refresh_token": "refresh-token-123",
    }
  `)
})
