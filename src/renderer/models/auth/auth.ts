import { Auth, AuthProviders } from "Renderer/models/auth/auth.typings"
import { authFactory } from "Renderer/models/auth/auth.helpers"

export const initialState: Auth = {
  google: {},
}

export default {
  state: initialState,
  reducers: {
    setProviderData(
      state: Auth,
      provider: AuthProviders,
      data: Record<string, string | number>
    ): Auth {
      return {
        ...state,
        [provider]: authFactory(data),
      }
    },
  },
}
