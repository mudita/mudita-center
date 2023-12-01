/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Auth, AuthPayload } from "App/__deprecated__/renderer/models/auth/auth.typings"
import { authFactory } from "App/__deprecated__/renderer/models/auth/auth.helpers"
import { createModel } from "@rematch/core"
import { RootModel } from "App/__deprecated__/renderer/models/models"

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
