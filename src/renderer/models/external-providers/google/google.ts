import {
  GoogleAuthFailedResponse,
  GoogleAuthSuccessResponse,
  GoogleCalendarsSuccess,
  GoogleEvent,
  GoogleEventsSuccess,
  GoogleProviderState,
} from "Renderer/models/external-providers/google/google.interface"
import { Dispatch } from "Renderer/store/external-providers"
import { ipcRenderer } from "electron-better-ipc"
import { GoogleAuthActions } from "Common/enums/google-auth-actions.enum"
import logger from "App/main/utils/logger"
import { ExternalProvidersState } from "Renderer/models/external-providers/external-providers.interface"
import moment from "moment"
import {
  mapCalendars,
  mapEvents,
} from "Renderer/models/external-providers/google/google.helpers"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

export const googleEndpoints = {
  people: "https://people.googleapis.com/v1/people",
  calendars: "https://www.googleapis.com/calendar/v3",
}

export const createInitialState = (): GoogleProviderState => ({
  auth: {},
})

export const createStore = () => ({
  state: createInitialState(),
  reducers: {
    setAuthData(
      state: GoogleProviderState,
      authData: GoogleProviderState["auth"]
    ) {
      state.auth = {
        ...state.auth,
        ...authData,
      }
      return state
    },
  },
  effects: (dispatch: Dispatch) => ({
    async requestWrapper<ReturnType>(
      axiosProps: AxiosRequestConfig,
      rootState: ExternalProvidersState,
      tries = 0
    ): Promise<AxiosResponse<ReturnType>> {
      const { url, method = "GET", headers, ...rest } = axiosProps

      let currentToken = rootState.google.auth.access_token

      if (!currentToken) {
        await dispatch.google.authorize()
        currentToken = rootState.google.auth.access_token
      }

      const request = (token = currentToken) => {
        return axios(url as string, {
          ...rest,
          method: method,
          headers: {
            ...headers,
            Authorization: `${rootState.google.auth.token_type} ${token}`,
          },
        })
      }

      try {
        return await request()
      } catch (error) {
        if (error.response.status === 401 && tries < 2) {
          const refreshToken = rootState.google.auth.refresh_token

          const { data } = await axios.post(
            `${process.env.MUDITA_GOOGLE_REFRESH_TOKEN_URL}?refreshToken=${refreshToken}`
          )
          await dispatch.google.setAuthData(data)
          return this.requestWrapper(axiosProps, rootState, tries + 1)
        } else {
          logger.error(error)

          try {
            logger.info("Reauthorizing Google account")
            await dispatch.google.authorize()
            return await request()
          } catch (authorizeError) {
            logger.error(authorizeError)
            throw authorizeError
          }
        }
      }
    },
    authorize(_: undefined, rootState: ExternalProvidersState) {
      return new Promise(async (resolve, reject) => {
        logger.info("Authorizing in Google")

        const token = rootState.google.auth.access_token

        if (token) {
          resolve()
          return
        }

        await ipcRenderer.callMain(GoogleAuthActions.OpenWindow)

        const processResponse = async (response: string) => {
          const responseData = JSON.parse(response)

          if (responseData.error) {
            reject((responseData as GoogleAuthFailedResponse).error)
          } else {
            dispatch.google.setAuthData(
              responseData as GoogleAuthSuccessResponse
            )
            resolve()
          }
          await ipcRenderer.callMain(GoogleAuthActions.CloseWindow)
        }

        await ipcRenderer.answerMain(
          GoogleAuthActions.GotCredentials,
          processResponse
        )
      })
    },
    async getCalendars(_: undefined, rootState: ExternalProvidersState) {
      logger.info("Getting Google calendars")

      const { data } = await this.requestWrapper<GoogleCalendarsSuccess>(
        {
          url: `${googleEndpoints.calendars}/users/me/calendarList`,
        },
        rootState
      )

      if (!data?.items) {
        throw new Error("No calendars found")
      }

      return mapCalendars(data.items)
    },
    async getEvents(calendarId: string, rootState: ExternalProvidersState) {
      logger.info("Getting Google events")

      const request = (pageToken?: string) => {
        const params = new URLSearchParams({
          singleEvents: "true",
          orderBy: "startTime",
          timeMin: moment().startOf("day").toISOString(),
          timeMax: moment().add(1, "year").endOf("year").toISOString(),
          maxResults: "1000",
          ...(pageToken ? { pageToken } : {}),
        })
        return this.requestWrapper<GoogleEventsSuccess>(
          {
            url: `${
              googleEndpoints.calendars
            }/calendars/${calendarId}/events?${params.toString()}`,
          },
          rootState
        )
      }

      if (!calendarId) {
        throw new Error("No calendar is selected")
      }

      try {
        const { data } = await request()

        let nextPageToken = data.nextPageToken
        let events: GoogleEvent[] = data.items

        while (nextPageToken) {
          const { data } = await request(nextPageToken)

          events = [...events, ...data.items]
          nextPageToken = data.nextPageToken
        }

        return mapEvents(events)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  }),
})

export default createStore()
