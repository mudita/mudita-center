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
import { requestWrapper } from "Renderer/models/external-providers/google/google.helpers"
import logger from "App/main/utils/logger"
import { ExternalProvidersState } from "Renderer/models/external-providers/external-providers.interface"
import moment from "moment"
import {
  mapGoogleCalendars,
  mapGoogleEvents,
} from "Renderer/models/calendar/calendar.helpers"

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
        const { data } = await requestWrapper<GoogleCalendarsSuccess>(
          {
            url: `${endpoints.calendars}/users/me/calendarList`,
          },
          rootState.google,
          dispatch
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
        return requestWrapper<GoogleEventsSuccess>(
          {
            url: `${
              endpoints.calendars
            }/calendars/${calendarId}/events?${params.toString()}`,
          },
          rootState.google,
          dispatch
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
