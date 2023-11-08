/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GoogleAuthFailedResponse,
  GoogleAuthSuccessResponse,
  GoogleContactResourceItem,
  GoogleContacts,
  GoogleProviderState,
  Scope,
} from "App/__deprecated__/renderer/models/external-providers/google/google.interface"
import { ipcRenderer } from "electron-better-ipc"
import { GoogleAuthActions } from "App/__deprecated__/common/enums/google-auth-actions.enum"
import logger from "App/__deprecated__/main/utils/logger"
import {
  ExternalProvidersState,
  RequestWrapperPayload,
} from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import { mapContact } from "App/__deprecated__/renderer/models/external-providers/google/google.helpers"
import axios, { AxiosResponse } from "axios"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { createModel } from "@rematch/core"
import { ExternalProvidersModels } from "App/__deprecated__/renderer/models/external-providers/external-providers.models"
import { RootState } from "App/__deprecated__/renderer/store/external-providers"

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
      return {
        ...state,
        [payload.scope]: {
          ...state[payload.scope],
          ...payload.data,
        },
      }
    },
  },
  effects: (d) => {
    const dispatch = d as unknown as RootState

    const requestWrapper = async <ReturnType>(
      payload: RequestWrapperPayload,
      rootState: ExternalProvidersState
    ): Promise<AxiosResponse<ReturnType>> => {
      const { scope, axiosProps, tries = 0 } = payload
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { url, method = "GET", headers, params = {}, ...rest } = axiosProps

      let currentToken = rootState.google[scope].access_token

      if (!currentToken) {
        await authorize(scope, rootState)
        currentToken = rootState.google[scope].access_token
      }

      const request = (token?: string) => {
        return axios(url as string, {
          ...rest,
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          params,
          method,
          headers: {
            ...headers,
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            Authorization: `${rootState.google[scope].token_type} ${
              // AUTO DISABLED - fix me if you like :)
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              token || currentToken
            }`,
          },
        })
      }

      try {
        return await request()
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error.response.status === 401 && tries < 2) {
          const refreshToken = rootState.google[scope].refresh_token

          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          const url = `${process.env.MUDITA_CENTER_SERVER_URL}/google-auth-refresh-token`
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { data } = await axios.post(
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${url}?refreshToken=${refreshToken}`
          )
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
          await dispatch.google.setAuthData({ scope, data })
          return requestWrapper(
            { scope, axiosProps, tries: tries + 1 },
            rootState
          )
        } else {
          logger.error(
            `Google Client: get refresh token fail. Data: ${JSON.stringify(
              error
            )}`
          )

          try {
            logger.info("Reauthorizing Google account")
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            await dispatch.google.authorize(scope)
            return await request()
          } catch (authorizeError) {
            logger.error(
              `Google Client: authorize fail. Data: ${JSON.stringify(
                authorizeError
              )}`
            )
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

        void ipcRenderer.callMain(GoogleAuthActions.OpenWindow, scope)

        const processResponse = (response: string) => {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const responseData = JSON.parse(response)
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (responseData.error) {
            reject((responseData as GoogleAuthFailedResponse).error)
          } else {
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            dispatch.google.setAuthData({
              scope,
              data: responseData as GoogleAuthSuccessResponse,
            })
            resolve()
          }
          void ipcRenderer.callMain(GoogleAuthActions.CloseWindow)
          unregisterMainListener()
        }

        ipcRenderer.answerMain(GoogleAuthActions.CloseWindow, () => {
          reject("window closed")
        })

        unregisterMainListener = ipcRenderer.answerMain(
          GoogleAuthActions.GotCredentials,
          processResponse
        )
      })
    }

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getContacts = async (_: undefined, rootState: any) => {
      logger.info("Getting Google contacts")

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
      return new Promise(async (resolve) => {
        let contacts: GoogleContactResourceItem[] = []
        let totalItems = null
        let nextPageToken = null

        while (nextPageToken === null || contacts.length !== totalItems) {
          const { data } = (await requestWrapper(
            {
              scope: Scope.Contacts,
              axiosProps: {
                url: `${googleEndpoints.people}/people/me/connections`,
                params: {
                  personFields:
                    "names,addresses,phoneNumbers,emailAddresses,biographies",
                  pageSize: 1000,
                  ...(nextPageToken && {
                    pageToken: String(nextPageToken),
                  }),
                },
              },
            },
            rootState
          )) as unknown as AxiosResponse<GoogleContacts>

          totalItems = data.totalItems ?? 0
          nextPageToken = data.nextPageToken
          contacts = [...contacts, ...(data.connections ?? [])]
        }

        resolve(
          contacts.map((contact: GoogleContactResourceItem) =>
            mapContact(contact)
          ) ?? []
        )
      })
    }

    const closeWindow = async () => {
      await ipcRenderer.callMain(GoogleAuthActions.CloseWindow)
    }

    return {
      requestWrapper,
      authorize,
      getContacts,
      closeWindow,
    }
  },
})

export default google
