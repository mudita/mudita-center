/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  GoogleAuthFailedResponse,
  GoogleAuthSuccessResponse,
  GoogleCalendarsSuccess,
  GoogleContactResourceItem,
  GoogleContacts,
  GoogleEvent,
  GoogleEventsSuccess,
  GoogleProviderState,
  Scope,
} from "Renderer/models/external-providers/google/google.interface"
import { ipcRenderer } from "electron-better-ipc"
import { GoogleAuthActions } from "Common/enums/google-auth-actions.enum"
import logger from "App/main/utils/logger"
import {
  ExternalProvidersState,
  RequestWrapperPayload,
} from "Renderer/models/external-providers/external-providers.interface"
import moment from "moment"
import {
  mapCalendars,
  mapContact,
  mapEvents,
} from "Renderer/models/external-providers/google/google.helpers"
import axios, { AxiosResponse } from "axios"
import { noop } from "Renderer/utils/noop"
import { createModel } from "@rematch/core"
import { ExternalProvidersModels } from "Renderer/models/external-providers/external-providers.models"
import { Calendar } from "Renderer/models/calendar/calendar.interfaces"
import { RootState } from "App/renderer/store/external-providers"

export const googleEndpoints = {
  people: "https://people.googleapis.com/v1",
  calendars: "https://www.googleapis.com/calendar/v3",
}

export const createInitialState = (): GoogleProviderState => ({
  [Scope.Calendar]: {},
  [Scope.Contacts]: {},
})

const google = createModel<ExternalProvidersModels>({
  state: createInitialState(),
  reducers: {
    setAuthData(
      state: GoogleProviderState,
      payload: {
        data: Partial<GoogleAuthSuccessResponse>
        scope: Scope
      }
    ) {
      state[payload.scope] = {
        ...state[payload.scope],
        ...payload.data,
      }
      return state
    },
  },
  effects: (d) => {
    const dispatch = (d as unknown) as RootState

    const requestWrapper = async <ReturnType>(
      payload: RequestWrapperPayload,
      rootState: ExternalProvidersState
    ): Promise<AxiosResponse<ReturnType>> => {
      const { scope, axiosProps, tries = 0 } = payload
      const { url, method = "GET", headers, ...rest } = axiosProps

      let currentToken = rootState.google[scope].access_token

      if (!currentToken) {
        await authorize(scope, rootState)
        currentToken = rootState.google[scope].access_token
      }

      const request = (token?: string) => {
        return axios(url as string, {
          ...rest,
          method,
          headers: {
            ...headers,
            Authorization: `${rootState.google[scope].token_type} ${
              token || currentToken
            }`,
          },
        })
      }

      try {
        return await request()
      } catch (error) {
        if (error.response.status === 401 && tries < 2) {
          const refreshToken = rootState.google[scope].refresh_token

          const { data } = await axios.post(
            `${process.env.MUDITA_GOOGLE_REFRESH_TOKEN_URL}?refreshToken=${refreshToken}`
          )
          await dispatch.google.setAuthData({ scope, data })
          return requestWrapper(
            { scope, axiosProps, tries: tries + 1 },
            rootState
          )
        } else {
          logger.error(error)

          try {
            logger.info("Reauthorizing Google account")
            await dispatch.google.authorize(scope)
            return await request()
          } catch (authorizeError) {
            logger.error(authorizeError)
            throw authorizeError
          }
        }
      }
    }

    const authorize = (scope: Scope, rootState: ExternalProvidersState) => {
      return new Promise<void>((resolve, reject) => {
        logger.info("Authorizing in Google")

        const token = rootState.google[scope].access_token

        if (token) {
          resolve()
          return
        }

        let unregisterMainListener = noop

        ipcRenderer.callMain(GoogleAuthActions.OpenWindow, scope)

        const processResponse = (response: string) => {
          const responseData = JSON.parse(response)
          if (responseData.error) {
            reject((responseData as GoogleAuthFailedResponse).error)
          } else {
            dispatch.google.setAuthData({
              scope,
              data: responseData as GoogleAuthSuccessResponse,
            })
            resolve()
          }
          ipcRenderer.callMain(GoogleAuthActions.CloseWindow)
          unregisterMainListener()
        }

        unregisterMainListener = ipcRenderer.answerMain(
          GoogleAuthActions.GotCredentials,
          processResponse
        )
      })
    }

    const getCalendars = async (
      _: undefined,
      rootState: ExternalProvidersState
    ): Promise<Calendar[]> => {
      logger.info("Getting Google calendars")

      const { data } = await requestWrapper<GoogleCalendarsSuccess>(
        {
          scope: Scope.Calendar,
          axiosProps: {
            url: `${googleEndpoints.calendars}/users/me/calendarList`,
          },
        },
        rootState
      )

      if (!data?.items) {
        throw new Error("No calendars found")
      }

      return mapCalendars(data.items)
    }

    const getContacts = async (_: undefined, rootState: any) => {
      logger.info("Getting Google contacts")

      const { data } = await requestWrapper<GoogleContacts>(
        {
          scope: Scope.Contacts,
          axiosProps: {
            url: `${googleEndpoints.people}/people/me/connections?personFields=names,addresses,phoneNumbers,emailAddresses,biographies`,
          },
        },
        rootState
      )

      return data.connections.map((contact: GoogleContactResourceItem) =>
        mapContact(contact)
      )
    }

    const getEvents = async (
      calendarId: string,
      rootState: ExternalProvidersState
    ) => {
      logger.info("Getting Google events")

      const request = (pageToken?: string) => {
        const params = new URLSearchParams({
          timeMin: moment().startOf("day").toISOString(),
          timeMax: moment().add(1, "year").endOf("year").toISOString(),
          maxResults: "1000",
          ...(pageToken ? { pageToken } : {}),
        })

        return requestWrapper<GoogleEventsSuccess>(
          {
            scope: Scope.Calendar,
            axiosProps: {
              url: `${
                googleEndpoints.calendars
              }/calendars/${calendarId}/events?${params.toString()}`,
            },
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

        return mapEvents(events, calendarId)
      } catch (error) {
        logger.error(error)
        throw error
      }
    }
    return {
      requestWrapper,
      authorize,
      getCalendars,
      getContacts,
      getEvents,
    }
  },
})

export default google
