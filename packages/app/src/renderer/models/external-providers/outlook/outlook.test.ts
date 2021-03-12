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
        callback: (data: unknown) => PromiseLike<unknown>
      ) => {
        switch (channel) {
          case OutlookAuthActions.GotCredentials:
            callback(JSON.stringify(authData))
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

const initStore = () => {
  return init({
    models: { outlook },
  })
}

let store = initStore()

beforeEach(() => {
  store = initStore()
})

test("store returns initial state", () => {
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "outlook": Object {
        "contacts": Object {},
      },
    }
  `)
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

test("authorization handles error properly", async () => {
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
              callback(JSON.stringify({ error: "some error" }))
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

  await store.dispatch.outlook.authorize("contacts")
  expect(store.getState().outlook.contacts).toMatchInlineSnapshot(`
    Object {
      "access_token": "token-123",
      "refresh_token": "refresh-token-123",
    }
  `)
})
