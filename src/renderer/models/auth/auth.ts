import { Auth, AuthPayload } from "Renderer/models/auth/auth.typings"
import { authFactory } from "Renderer/models/auth/auth.helpers"

export const initialState: Auth = {}

export default {
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
}
