/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import axios from "axios"
import {
  apiBaseUrl,
  clientId,
  redirectUrl,
} from "Renderer/models/external-providers/outlook/outlook.constants"
import {
  OutlookAuthSuccessResponse,
  OutLookScope,
} from "Renderer/models/external-providers/outlook/outlook.interface"

export const requestTokens = async (
  code: string,
  scope: string
): Promise<OutlookAuthSuccessResponse> => {
  const urlSearchParams = new URLSearchParams({
    client_id: clientId,
    scope,
    code,
    redirect_uri: redirectUrl,
    grant_type: "authorization_code",
  })

  const {
    data,
  }: {
    data: OutlookAuthSuccessResponse
  } = await axios.post(
    `${apiBaseUrl}/token`,
    urlSearchParams.toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } } // The header is required
  )

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  }
}

export const handleScope = (scope: OutLookScope): string => {
  switch (scope) {
    case OutLookScope.Contacts:
      return "offline_access, https://graph.microsoft.com/contacts.read"
  }
}
