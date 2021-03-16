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
import { mapContact } from "Renderer/models/external-providers/outlook/outlook.helpers"

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
      logger.info("Getting Google contacts")

      // const { data } = await requestWrapper<GoogleContacts>(
      //   {
      //     scope: Scope.Contacts,
      //     axiosProps: {
      //       url: `${googleEndpoints.people}/people/me/connections?personFields=names,addresses,phoneNumbers,emailAddresses,biographies`,
      //     },
      //   },
      //   rootState
      // )
      //
      // return data.connections.map((contact: GoogleContactResourceItem) =>
      //   mapContact(contact)
      // )
      const token = rootState.outlook[OutLookScope.Contacts].access_token
      const { data } = await axios.get(`${baseGraphUrl}/me/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      console.log("data.value", data.value)
      const aaa = data.value.map((contact: any) => mapContact(contact))
      console.log({ aaa })
      return aaa
    }

    return {
      authorize,
      getContacts,
    }
  },
})

export default outlook
