/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BaseProvider, Events } from "./base"
import {
  ExternalAuthProvidersAuthorizationData,
  ExternalAuthProvidersScope,
  OutlookCalendarEvent,
  OutlookContact,
} from "app-utils/models"

export class OutlookProvider extends BaseProvider<
  OutlookContact,
  OutlookCalendarEvent
> {
  private baseUrl = "https://login.microsoftonline.com/common/oauth2/v2.0"
  private redirectUrl =
    "https://login.microsoftonline.com/common/oauth2/nativeclient"
  private clientId = import.meta.env.VITE_MICROSOFT_AUTH_CLIENT_ID
  private dataEndpoints = {
    [ExternalAuthProvidersScope.Contacts]:
      "https://graph.microsoft.com/v1.0/me/contacts",
    [ExternalAuthProvidersScope.Calendar]:
      "https://graph.microsoft.com/v1.0/me/calendars",
  }

  constructor() {
    super()
    this.windowConfig.title = "Outlook Authentication"
  }

  reset() {
    super.reset()
  }

  public async authenticate(scopes: ExternalAuthProvidersScope[]) {
    const authUrl = this.getAuthUrl(scopes)
    await this.openAuthWindow(authUrl)
    await this.retrieveAuthorizationData(scopes)
  }

  async getContactsData() {
    if (!this.authData) {
      throw new Error("No authorization data available")
    }

    const url = this.dataEndpoints[ExternalAuthProvidersScope.Contacts]
    const response = await fetch(url, {
      headers: {
        Authorization: `${this.authData.tokenType} ${this.authData.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch contacts: ${response.statusText}`)
    }
    const data = await response.json()

    return data.value as OutlookContact[]
  }

  async getCalendarData() {
    return [] as OutlookCalendarEvent[]
  }

  private async retrieveAuthorizationData(
    scopes: ExternalAuthProvidersScope[]
  ) {
    const webContents = this.window?.webContents
    if (!webContents) {
      throw new Error("Authentication window is not available")
    }
    webContents.session.webRequest.onBeforeRequest(
      {
        urls: [this.redirectUrl + "*"],
      },
      async ({ url }) => {
        const code = new URL(url).searchParams.get("code")
        if (!code) {
          this.eventEmitter.emit(Events.AuthError)
          return
        }
        this.authData = await this.exchangeCodeForTokens(code, scopes)
        this.eventEmitter.emit(Events.AuthSuccess)
      }
    )
  }

  private async exchangeCodeForTokens(
    code: string,
    scopes: ExternalAuthProvidersScope[]
  ): Promise<ExternalAuthProvidersAuthorizationData> {
    if (!this.clientId) {
      throw new Error("VITE_MICROSOFT_AUTH_CLIENT_ID is not defined")
    }

    const searchParams = new URLSearchParams()
    searchParams.set("client_id", this.clientId)
    searchParams.set("grant_type", "authorization_code")
    searchParams.set("code", code)
    searchParams.set("redirect_uri", this.redirectUrl)
    searchParams.set("scope", this.obtainScopesParam(scopes))

    const response = await fetch(`${this.baseUrl}/token`, {
      method: "POST",
      body: searchParams.toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    if (!response.ok) {
      throw new Error(
        `Failed to exchange code for tokens: ${response.statusText}`
      )
    }
    const data = await response.json()
    if (
      !("access_token" in data) ||
      !("refresh_token" in data) ||
      !("token_type" in data)
    ) {
      throw new Error("Invalid token response from Outlook")
    }
    return {
      tokenType: data.token_type,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    }
  }

  private getAuthUrl(scopes: ExternalAuthProvidersScope[]): string {
    if (!this.clientId) {
      throw new Error("VITE_MICROSOFT_AUTH_CLIENT_ID is not defined")
    }

    const url = new URL(`${this.baseUrl}/authorize`)
    url.searchParams.set("client_id", this.clientId)
    url.searchParams.set("response_type", "code")
    url.searchParams.set("redirect_uri", this.redirectUrl)
    url.searchParams.set("scope", this.obtainScopesParam(scopes))
    url.searchParams.set("prompt", "select_account")

    return url.toString()
  }

  private obtainScopesParam(scopes: ExternalAuthProvidersScope[]) {
    const scopeMappings = {
      [ExternalAuthProvidersScope.Contacts]: "contacts.read",
      [ExternalAuthProvidersScope.Calendar]: "calendars.read",
    }
    const mappedScopes = scopes.map((scope) => scopeMappings[scope])
    return ["offline_access", ...mappedScopes].join(" ")
  }
}
