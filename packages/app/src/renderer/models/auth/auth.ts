/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Auth, AuthPayload } from "Renderer/models/auth/auth.typings"
import { authFactory } from "Renderer/models/auth/auth.helpers"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"

export const initialState: Auth = {}

const auth = createModel<RootModel>({
  state: initialState,
  reducers: {
    setProviderData(state: Auth, payload: AuthPayload): Auth {
      const { provider, data } = payload
      return {
        ...state,
        [provider]: authFactory(data),
      }
    },
  },
})

export default auth
