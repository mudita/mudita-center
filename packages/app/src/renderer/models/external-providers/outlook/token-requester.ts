/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import axios, { AxiosInstance } from "axios"
import {
  apiBaseUrl,
  clientId,
  redirectUrl,
} from "Renderer/models/external-providers/outlook/outlook.constants"
import {
  OutlookAuthSuccessResponse,
  OutLookScope,
  TokenPayload,
} from "Renderer/models/external-providers/outlook/outlook.interface"
import { getOutlookEndpoint } from "Renderer/models/external-providers/outlook/outlook.helpers"
import logger from "App/main/utils/logger"

interface TokenRequesterInterface {
  requestTokens(code: string, scope: string): Promise<TokenPayload>
  regenerateTokens(
    refreshToken: string,
    scope: OutLookScope
  ): Promise<TokenPayload>
}

export class TokenRequester implements TokenRequesterInterface {
  constructor(private readonly httpClient: AxiosInstance = axios.create()) {}
  async requestTokens(code: string, scope: string): Promise<TokenPayload> {
    const urlSearchParams = new URLSearchParams({
      client_id: clientId,
      scope,
      code,
      redirect_uri: redirectUrl,
      grant_type: "authorization_code",
    })
    try {
      const {
        data,
      }: {
        data: OutlookAuthSuccessResponse
      } = await this.httpClient.post(
        `${apiBaseUrl}/token`,
        urlSearchParams.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } } // The header is required
      )

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      }
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }
  }
  async regenerateTokens(
    refreshToken: string,
    scope: OutLookScope
  ): Promise<TokenPayload> {
    const urlSearchParams = new URLSearchParams({
      client_id: clientId,
      scope: getOutlookEndpoint(scope),
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    })
    try {
      const {
        data,
      }: {
        data: OutlookAuthSuccessResponse
      } = await this.httpClient.post(
        `${apiBaseUrl}/token`,
        urlSearchParams.toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      }
    } catch (error) {
      logger.error(error)
      throw new Error(error)
    }
  }
}
