import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { GoogleProviderState } from "Renderer/models/external-providers/google/google.interface"
import { Dispatch } from "Renderer/store/external-providers"

export const requestWrapper = async <T = unknown>(
  axiosProps: AxiosRequestConfig,
  state: GoogleProviderState,
  dispatch: Dispatch
): Promise<AxiosResponse<T>> => {
  const { url, method = "GET", headers, ...rest } = axiosProps

  if (!url) {
    throw new Error("No url specified")
  }

  const currentToken = state.auth.access_token

  if (!currentToken) {
    try {
      await dispatch.google.authorize()
      return requestWrapper(axiosProps, state, dispatch)
    } catch (error) {
      throw new Error(error)
    }
  }

  const request = (token = currentToken) => {
    return axios(url, {
      ...rest,
      method: method,
      headers: {
        ...headers,
        Authorization: `${state.auth.token_type} ${token}`,
      },
    })
  }

  try {
    const response = await request()
    dispatch.google.resetInvalidRequests()
    return response
  } catch (error) {
    if (error.response.status === 401) {
      if (state.invalidRequests < 2) {
        await dispatch.google.incrementInvalidRequests()

        const refreshToken = state.auth.refresh_token

        if (!refreshToken) {
          throw new Error("No google refresh token found")
        }

        const { data } = await axios.post(
          `${process.env.MUDITA_GOOGLE_REFRESH_TOKEN_URL}?refreshToken=${refreshToken}`
        )

        await dispatch.google.setAuthData(data)

        return requestWrapper(axiosProps, state, dispatch)
      } else {
        try {
          dispatch.google.resetInvalidRequests()
          await dispatch.google.authorize()
        } catch (error) {
          throw new Error(error)
        }
      }
    }

    throw new Error(error)
  }
}
