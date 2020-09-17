import axios, { AxiosResponse, Method } from "axios"
import initStore from "Renderer/store"
import { RematchStore } from "@rematch/core"
import { RootModel } from "Renderer/models/models"
import { AuthKeys } from "Renderer/models/auth/auth.helpers"

const googleAuthWrapper = (
  url: string,
  method: Method = "GET",
  config: Record<string, any> = {},
  store: RematchStore<RootModel> = initStore
): Promise<AxiosResponse> => {
  const { auth } = store.getState()

  if (
    auth.google &&
    auth.google[AuthKeys.Token] &&
    auth.google[AuthKeys.TokenType]
  ) {
    return axios(url, {
      method,
      headers: {
        Authorization: `${auth.google[AuthKeys.TokenType]} ${
          auth.google[AuthKeys.Token]
        }`,
      },
      ...config,
    })
  }

  throw new Error("Missing credentials")
}

export default googleAuthWrapper
