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
  mapGoogleCalendars,
  mapGoogleEvents,
} from "Renderer/models/calendar/calendar.helpers"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const endpoints = {
  people: "https://people.googleapis.com/v1/people",
  calendars: "https://www.googleapis.com/calendar/v3",
}

export const initialState: GoogleProviderState = {
  invalidRequests: 0,
  auth: {},
}

export default {
  state: initialState,
  reducers: {
    incrementInvalidRequests(state: GoogleProviderState) {
      state.invalidRequests++
      return state
    },
    resetInvalidRequests(state: GoogleProviderState) {
      state.invalidRequests = 0
      return state
    },
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
    setActiveCalendar(state: GoogleProviderState, calendarId: string) {
      state.activeCalendarId = calendarId
      return state
    },
  },
  effects: (dispatch: Dispatch) => ({
    async requestWrapper<ReturnType>(
      axiosProps: AxiosRequestConfig,
      rootState: ExternalProvidersState
    ): Promise<AxiosResponse<ReturnType>> {
      const { url, method = "GET", headers, ...rest } = axiosProps

      if (!url) {
        throw new Error("No url specified")
      }

      const currentToken = rootState.google.auth.access_token

      if (!currentToken) {
        try {
          await dispatch.google.authorize()
          return this.requestWrapper(axiosProps, rootState)
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
            Authorization: `${rootState.google.auth.token_type} ${token}`,
          },
        })
      }

      try {
        const response = await request()
        dispatch.google.resetInvalidRequests()
        return response
      } catch (error) {
        if (error.response.status === 401) {
          if (rootState.google.invalidRequests < 2) {
            await dispatch.google.incrementInvalidRequests()

            const refreshToken = rootState.google.auth.refresh_token

            if (!refreshToken) {
              throw new Error("No google refresh token found")
            }

            const { data } = await axios.post(
              `${process.env.MUDITA_GOOGLE_REFRESH_TOKEN_URL}?refreshToken=${refreshToken}`
            )

            await dispatch.google.setAuthData(data)

            return this.requestWrapper(axiosProps, rootState)
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
    },
    authorize(...[, rootState]: [undefined, ExternalProvidersState]) {
      return new Promise(async (resolve, reject) => {
        const token = rootState.google.auth.access_token

        if (token) {
          resolve()
        }

        await ipcRenderer.callMain(GoogleAuthActions.OpenWindow)

        const processResponse = async (response: string) => {
          const responseData = JSON.parse(response)

          if (responseData.error) {
            reject((responseData as GoogleAuthFailedResponse).error)
          }

          dispatch.google.setAuthData(responseData as GoogleAuthSuccessResponse)
          await ipcRenderer.callMain(GoogleAuthActions.CloseWindow)
          resolve()
        }

        ipcRenderer.answerMain(
          GoogleAuthActions.GotCredentials,
          processResponse
        )
      })
    },
    async getCalendars(...[, rootState]: [undefined, ExternalProvidersState]) {
      try {
        const { data } = await this.requestWrapper<GoogleCalendarsSuccess>(
          {
            url: `${endpoints.calendars}/users/me/calendarList`,
          },
          rootState
        )
        return mapGoogleCalendars(data.items)
      } catch (error) {
        throw new Error(error)
      }
    },
    async getEvents(...[, rootState]: [undefined, ExternalProvidersState]) {
      const request = (calendarId: string, nextPageToken?: string) => {
        const params = new URLSearchParams({
          singleEvents: "true",
          orderBy: "startTime",
          timeMin: moment().startOf("day").toISOString(),
          timeMax: moment().add(1, "year").endOf("year").toISOString(),
          maxResults: "1000",
          ...(nextPageToken ? { pageToken: nextPageToken } : {}),
        })
        return this.requestWrapper<GoogleEventsSuccess>(
          {
            url: `${
              endpoints.calendars
            }/calendars/${calendarId}/events?${params.toString()}`,
          },
          rootState
        )
      }

      if (!rootState.google.activeCalendarId) {
        throw new Error("No calendar is selected")
      }

      try {
        const { data } = await request(rootState.google.activeCalendarId)

        let nextPageToken = data.nextPageToken
        let events: GoogleEvent[] = data.items

        while (nextPageToken) {
          const { data } = await request(
            rootState.google.activeCalendarId,
            nextPageToken
          )

          events = [...events, ...data.items]
          nextPageToken = data.nextPageToken
        }

        return mapGoogleEvents(events)
      } catch (error) {
        logger.error(error)
        return error
      }
    },
  }),
}
