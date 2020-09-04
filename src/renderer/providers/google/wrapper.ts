import axios, { AxiosResponse, Method } from "axios"
import initStore from "Renderer/store"
import { RematchStore } from "@rematch/core"
import { RootModel } from "Renderer/models/models"

const googleAuthWrapper = (
  url: string,
  method: Method = "GET",
  config: Record<string, any> = {},
  store: RematchStore<RootModel> = initStore
): Promise<AxiosResponse> => {
  const { auth } = store.getState()

  if (auth.google && auth.google.token_type && auth.google.access_token) {
    return axios(url, {
      method,
      headers: {
        Authorization: `${auth.google.token_type} ${auth.google.access_token}`,
      },
      ...config,
    })
  }

  throw new Error("Missing credentials")
}

export default googleAuthWrapper
