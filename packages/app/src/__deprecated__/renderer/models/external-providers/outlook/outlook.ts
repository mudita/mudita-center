/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import logger from "App/__deprecated__/main/utils/logger"
import { ExternalProvidersState } from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { createModel } from "@rematch/core"
import { ExternalProvidersModels } from "App/__deprecated__/renderer/models/external-providers/external-providers.models"
import { RootState } from "App/__deprecated__/renderer/store/external-providers"
import { OutlookAuthActions } from "App/__deprecated__/common/enums/outlook-auth-actions.enum"
import {
  OutlookAuthErrorResponse,
  OutlookAuthSuccessResponse,
  OutLookScope,
  TokenPayload,
} from "App/__deprecated__/renderer/models/external-providers/outlook/outlook.interface"
import {
  apiBaseUrl,
  clientId,
  redirectUrl,
} from "App/__deprecated__/renderer/models/external-providers/outlook/outlook.constants"
import {
  fetchCalendars,
  fetchContacts,
  fetchEvents,
  getOutlookEndpoint,
} from "App/__deprecated__/renderer/models/external-providers/outlook/outlook.helpers"

import { TokenRequester } from "App/__deprecated__/renderer/models/external-providers/outlook/token-requester"
import { Contact } from "App/contacts/reducers"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createInitialState = () => ({
  [OutLookScope.Contacts]: {},
  [OutLookScope.Calendars]: {},
})

const isOutlookErrorResponse = (
  response: OutlookAuthSuccessResponse | OutlookAuthErrorResponse
): response is OutlookAuthErrorResponse => {
  return "error" in response
}

const outlook = createModel<ExternalProvidersModels>({
  state: createInitialState(),
  reducers: {
    setAuthData(
      state,
      payload: {
        data: TokenPayload
        scope: OutLookScope
      }
    ) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...state,
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        [payload.scope]: {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          ...state[payload.scope],
          ...payload.data,
        },
      }
    },
  },
  effects: (d) => {
    const dispatch = d as unknown as RootState

    const authorize = (
      scope: OutLookScope,
      rootState: ExternalProvidersState
    ) => {
      return new Promise<void>((resolve, reject) => {
        logger.info("Authorizing in Outlook")
        const token = rootState.outlook[scope].accessToken

        if (token) {
          resolve()
          return
        }

        const getAuthorizationUrl = () => {
          const urlSearchParams = new URLSearchParams({
            client_id: clientId,
            response_type: "code",
            redirect_uri: redirectUrl,
            scope: getOutlookEndpoint(scope),
          })

          return `${apiBaseUrl}/authorize?${urlSearchParams.toString()}`
        }

        let unregisterMainListener = noop

        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        ipcRenderer.callMain(OutlookAuthActions.OpenWindow, {
          authorizationUrl: getAuthorizationUrl(),
          scope: getOutlookEndpoint(scope),
        })

        const processResponse = (
          response: OutlookAuthSuccessResponse | OutlookAuthErrorResponse
        ) => {
          if (isOutlookErrorResponse(response)) {
            reject(response.error)
          } else {
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            dispatch.outlook.setAuthData({
              scope,
              data: response,
            })
            resolve()
          }
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          ipcRenderer.callMain(OutlookAuthActions.CloseWindow)
          unregisterMainListener()
        }

        unregisterMainListener = ipcRenderer.answerMain(
          OutlookAuthActions.GotCredentials,
          processResponse
        )
      })
    }

    const getContacts = async (
      _: undefined,
      rootState: ExternalProvidersState
    ): Promise<Contact[]> => {
      logger.info("Getting Outlook contacts")
      const accessToken = rootState.outlook[OutLookScope.Contacts].accessToken
      const refreshToken = rootState.outlook[OutLookScope.Contacts].refreshToken
      try {
        return await fetchContacts(accessToken)
      } catch ({ error }) {
        if (error === "invalid_grant") {
          const tokenRequester = new TokenRequester()
          const regeneratedTokens = await tokenRequester.regenerateTokens(
            refreshToken,
            OutLookScope.Contacts
          )
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          dispatch.outlook.setAuthData({
            scope: OutLookScope.Contacts,
            data: regeneratedTokens,
          })
          return await fetchContacts(regeneratedTokens.accessToken)
        } else {
          return []
        }
      }
    }

    const getCalendars = async (
      _: undefined,
      rootState: ExternalProvidersState
    ) => {
      logger.info("Getting Outlook calendars")

      let accessToken = rootState.outlook[OutLookScope.Calendars].accessToken
      const refreshToken =
        rootState.outlook[OutLookScope.Calendars].refreshToken

      if (!accessToken) {
        await authorize(OutLookScope.Calendars, rootState)
        accessToken = rootState.outlook[OutLookScope.Calendars].accessToken
      }

      try {
        return await fetchCalendars(accessToken)
      } catch (error) {
        if (error === "invalid_grant") {
          const tokenRequester = new TokenRequester()
          const regeneratedTokens = await tokenRequester.regenerateTokens(
            refreshToken,
            OutLookScope.Calendars
          )
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          dispatch.outlook.setAuthData({
            scope: OutLookScope.Calendars,
            data: regeneratedTokens,
          })
          return await fetchCalendars(regeneratedTokens.accessToken)
        } else {
          logger.error(
            `Outlook Client: fetch calendar request fail. Data: ${JSON.stringify(
              error
            )}`
          )

          try {
            logger.info("Reauthorizing Outlook account")
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            await dispatch.outlook.authorize(OutLookScope.Calendars)
            return await fetchCalendars(accessToken)
          } catch (authorizeError) {
            logger.error(
              `Outlook Client: authorize fail. Data: ${JSON.stringify(
                authorizeError
              )}`
            )
            throw authorizeError
          }
        }
      }
    }

    const getEvents = async (
      calendarId: string,
      rootState: ExternalProvidersState
    ) => {
      const accessToken = rootState.outlook[OutLookScope.Calendars].accessToken

      return fetchEvents(accessToken, calendarId)
    }

    return {
      authorize,
      getContacts,
      getCalendars,
      getEvents,
    }
  },
})

export default outlook
