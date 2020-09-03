import axios, { AxiosResponse, Method } from "axios"
import store from "Renderer/store"

const googleAuthWrapper = (
  url: string,
  method: Method = "GET",
  config: Record<string, any> = {}
): Promise<AxiosResponse> => {
  const { auth } = store.getState()

  return axios(url, {
    method,
    headers: {
      Authorization: `${auth.google.token_type} ${auth.google.access_token}`,
    },
    ...config,
  })
}

export default googleAuthWrapper
