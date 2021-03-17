/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
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
} from "Renderer/models/external-providers/outlook/outlook.interface"
import {
  apiBaseUrl,
  baseGraphUrl,
  clientId,
  redirectUrl,
} from "Renderer/models/external-providers/outlook/outlook.constants"
import axios from "axios"
import {
  mapContact,
  regenerateTokens,
} from "Renderer/models/external-providers/outlook/outlook.helpers"

export const createInitialState = () => ({
  [OutLookScope.Contacts]: {},
})

const outlook = createModel<ExternalProvidersModels>({
  state: createInitialState(),
  reducers: {
    setAuthData(
      state,
      payload: {
        data: Partial<OutlookAuthSuccessResponse>
        scope: OutLookScope
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

    const authorize = (scope: string, rootState: ExternalProvidersState) => {
      return new Promise<void>((resolve, reject) => {
        logger.info("Authorizing in Outlook")
        const token = rootState.outlook[OutLookScope.Contacts].access_token

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
          if ("error" in response && response.error) {
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
      const accessToken = rootState.outlook[OutLookScope.Contacts].access_token
      const refreshToken =
        rootState.outlook[OutLookScope.Contacts].refresh_token
      try {
        const { data } = await axios.get(`${baseGraphUrl}/me/contacts`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        const contacts = data.value.map((contact: any) => mapContact(contact))
        return contacts
      } catch ({ error }) {
        if (error === "invalid_grant") {
          const regeneratedTokens = await regenerateTokens(
            refreshToken,
            OutLookScope.Contacts
          )
          dispatch.outlook.setAuthData({
            scope: OutLookScope.Contacts,
            data: regeneratedTokens,
          })
          const { data } = await axios.get(`${baseGraphUrl}/me/contacts`, {
            headers: {
              Authorization: `Bearer ${regeneratedTokens.accessToken}`,
            },
          })
          return data
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
