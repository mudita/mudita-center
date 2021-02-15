/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { init } from "@rematch/core"
import auth from "Renderer/models/auth/auth"
import { AuthProviders } from "Renderer/models/auth/auth.typings"

import {
  authFactory,
  AuthKeys,
  tokenIsValid,
} from "Renderer/models/auth/auth.helpers"

const testToken = "token-12345"
const testTokenType = "Bearer"
const testExpiration = 1594977157202 // 2020-07-17
const actualDate = Date.now()

const examplePayload = {
  token_type: testTokenType,
  access_token: testToken,
  valid_until: testExpiration,
}

const examplePayloadWithExpiration = {
  ...examplePayload,
  expires_in: 3600,
}

const storeConfig = {
  models: { auth },
}

let store = init(storeConfig)

beforeEach(() => {
  store = init(storeConfig)
})

describe("Auth helpers tests", () => {
  jest.spyOn(Date, "now").mockImplementation(() => testExpiration)

  test("produces proper data model", () => {
    const model = authFactory(examplePayloadWithExpiration)
    expect(model).toMatchObject({
      [AuthKeys.Token]: testToken,
      [AuthKeys.TokenType]: testTokenType,
    })
  })

  test("provides proper token validity value with default prolongation period", () => {
    const model = authFactory(examplePayloadWithExpiration)
    expect(model[AuthKeys.Valid]).toBe(testExpiration + 3600000)
  })

  test("provides proper token validity value with provided prolongation period", () => {
    const prolongation = 100
    const model = authFactory(examplePayload, prolongation)
    expect(model[AuthKeys.Valid]).toBe(testExpiration + prolongation * 1000)
  })
})

describe("Auth redux tests", () => {
  test("proper initial state", () => {
    expect(Object.keys(store.getState().auth).length).toBe(0)
  })

  test("properly places the data", () => {
    store.dispatch.auth.setProviderData({
      provider: AuthProviders.Google,
      data: examplePayloadWithExpiration,
    })

    expect(AuthProviders.Google in store.getState().auth).toBeTruthy()
    expect(store.getState().auth[AuthProviders.Google].token_type).toBe(
      testTokenType
    )
    expect(store.getState().auth[AuthProviders.Google].access_token).toBe(
      testToken
    )
  })

  test("properly tells whether the token is still valid", () => {
    const model = authFactory(examplePayloadWithExpiration)

    store = init({
      ...storeConfig,
      redux: {
        initialState: {
          auth: {
            [AuthProviders.Google]: model,
          },
        },
      },
    })

    expect(
      tokenIsValid(store.getState().auth, AuthProviders.Google)
    ).toBeTruthy()
  })

  test("properly tells whether the token is invalid", () => {
    const model = authFactory(examplePayload)

    store = init({
      ...storeConfig,
      redux: {
        initialState: {
          auth: {
            [AuthProviders.Google]: model,
          },
        },
      },
    })

    jest.spyOn(Date, "now").mockImplementation(() => actualDate)

    expect(
      tokenIsValid(store.getState().auth, AuthProviders.Google)
    ).toBeFalsy()
  })
})
