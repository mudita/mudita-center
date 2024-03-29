/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import logger from "Core/__deprecated__/main/utils/logger"
import { ExternalProvidersState } from "Core/__deprecated__/renderer/models/external-providers/external-providers.interface"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
import { createModel } from "@rematch/core"
import { ExternalProvidersModels } from "Core/__deprecated__/renderer/models/external-providers/external-providers.models"
import { RootState } from "Core/__deprecated__/renderer/store/external-providers"
import { OutlookAuthActions } from "Core/__deprecated__/common/enums/outlook-auth-actions.enum"
import {
  OutlookAuthErrorResponse,
  OutlookAuthSuccessResponse,
  OutLookScope,
  TokenPayload,
} from "Core/__deprecated__/renderer/models/external-providers/outlook/outlook.interface"
import {
  apiBaseUrl,
  clientId,
  redirectUrl,
} from "Core/__deprecated__/renderer/models/external-providers/outlook/outlook.constants"
import {
  fetchContacts,
  getOutlookEndpoint,
} from "Core/__deprecated__/renderer/models/external-providers/outlook/outlook.helpers"

import { TokenRequester } from "Core/__deprecated__/renderer/models/external-providers/outlook/token-requester"
import { Contact } from "Core/contacts/reducers"

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

        void ipcRenderer.callMain(OutlookAuthActions.OpenWindow, {
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
          void ipcRenderer.callMain(OutlookAuthActions.CloseWindow)
          unregisterMainListener()
        }

        ipcRenderer.answerMain(OutlookAuthActions.CloseWindow, () => {
          reject("window closed")
        })

        unregisterMainListener = ipcRenderer.answerMain(
          OutlookAuthActions.GotCredentials,
          processResponse
        )
      })
    }

    type OutlookException = {
      error: string
    }

    function isOutlookException(
      exception: unknown
    ): exception is OutlookException {
      return (exception as OutlookException).error !== undefined
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
      } catch (ex) {
        if (isOutlookException(ex) && ex.error === "invalid_grant") {
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

    const closeWindow = async () => {
      await ipcRenderer.callMain(OutlookAuthActions.CloseWindow)
    }

    return {
      authorize,
      getContacts,
      closeWindow,
    }
  },
})

export default outlook
