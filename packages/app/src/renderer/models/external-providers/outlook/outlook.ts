/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import logger from "App/main/utils/logger"
import { ExternalProvidersState } from "Renderer/models/external-providers/external-providers.interface"
import { noop } from "Renderer/utils/noop"
import { createModel } from "@rematch/core"
import { ExternalProvidersModels } from "Renderer/models/external-providers/external-providers.models"
import { RootState } from "App/renderer/store/external-providers"
import { OutlookAuthActions } from "Common/enums/outlook-auth-actions.enum"
import {
  OutlookAuthErrorResponse,
  OutlookAuthSuccessResponse,
  OutLookScope,
  TokenPayload,
} from "Renderer/models/external-providers/outlook/outlook.interface"
import {
  apiBaseUrl,
  clientId,
  redirectUrl,
} from "Renderer/models/external-providers/outlook/outlook.constants"
import { fetchContacts } from "Renderer/models/external-providers/outlook/outlook.helpers"
import { TokenRequester } from "Renderer/models/external-providers/outlook/token-requester"

export const createInitialState = () => ({
  [OutLookScope.Contacts]: {},
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
    const dispatch = (d as unknown) as RootState

    const authorize = (scope: string, rootState: ExternalProvidersState) => {
      return new Promise<void>((resolve, reject) => {
        logger.info("Authorizing in Outlook")
        const token = rootState.outlook[OutLookScope.Contacts].accessToken

        const getAuthorizationUrl = () => {
          const urlSearchParams = new URLSearchParams({
            client_id: clientId,
            response_type: "code",
            redirect_uri: redirectUrl,
            scope,
          })

          return `${apiBaseUrl}/authorize?${urlSearchParams.toString()}`
        }
        if (token) {
          resolve()
          return
        }

        let unregisterMainListener = noop

        ipcRenderer.callMain(OutlookAuthActions.OpenWindow, {
          authorizationUrl: getAuthorizationUrl(),
          scope,
        })

        const processResponse = (
          response: OutlookAuthSuccessResponse | OutlookAuthErrorResponse
        ) => {
          if (isOutlookErrorResponse(response)) {
            reject(response.error)
          } else {
            dispatch.outlook.setAuthData({
              scope: OutLookScope.Contacts,
              data: response,
            })
            resolve()
          }
          ipcRenderer.callMain(OutlookAuthActions.CloseWindow)
          unregisterMainListener()
        }

        unregisterMainListener = ipcRenderer.answerMain(
          OutlookAuthActions.GotCredentials,
          processResponse
        )
      })
    }

    const getContacts = async (_: undefined, rootState: any) => {
      logger.info("Getting Outlook contacts")
      const accessToken = rootState.outlook[OutLookScope.Contacts].accessToken
      const refreshToken =
        rootState.outlook[OutLookScope.Contacts].refresh_token
      try {
        return await fetchContacts(accessToken)
      } catch ({ error }) {
        if (error === "invalid_grant") {
          const tokenRequester = new TokenRequester()
          const regeneratedTokens = await tokenRequester.regenerateTokens(
            refreshToken,
            OutLookScope.Contacts
          )
          dispatch.outlook.setAuthData({
            scope: OutLookScope.Contacts,
            data: regeneratedTokens,
          })
          return await fetchContacts(regeneratedTokens.accessToken)
        }
      }
    }

    return {
      authorize,
      getContacts,
    }
  },
})

export default outlook
