/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import http from "http"
import { check as checkPort } from "tcp-port-used"
import { people_v1 } from "googleapis"
import { BaseProvider, Events } from "./base"
import { ExternalAuthProvidersScope } from "app-utils/models"

export type GoogleContact = Pick<
  people_v1.Schema$Person,
  | "names"
  | "nicknames"
  | "phoneNumbers"
  | "emailAddresses"
  | "addresses"
  | "biographies"
  | "organizations"
  | "urls"
>

export type GoogleCalendarEvent = unknown

export class GoogleProvider extends BaseProvider<
  GoogleContact,
  GoogleCalendarEvent
> {
  private authServer: http.Server | undefined
  private serverPort = 3456
  private baseUrl = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount`
  private clientId = process.env.VITE_GOOGLE_AUTH_CLIENT_ID
  private centerServerUrl = process.env.VITE_MUDITA_CENTER_SERVER_URL
  private dataEndpoints = {
    [ExternalAuthProvidersScope.Contacts]:
      "https://people.googleapis.com/v1/people/me/connections",
    [ExternalAuthProvidersScope.Calendar]:
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
  }
  private get redirectUrl() {
    const defaultRedirectUrl = `${this.centerServerUrl}/google-auth-success`

    // Always use production redirect URL
    if (process.env.NODE_ENV !== "production") {
      const prodRedirectUrl = new URL(defaultRedirectUrl)
      const [firstSubdomain] = prodRedirectUrl.host.split(".")

      if (firstSubdomain && firstSubdomain !== "api") {
        prodRedirectUrl.host = prodRedirectUrl.host.replace(
          `${firstSubdomain}.`,
          ""
        )
      }
      return prodRedirectUrl.toString()
    }
    return defaultRedirectUrl
  }

  constructor() {
    super()
    this.windowConfig.title = "Google Authentication"
  }

  reset() {
    this.killAuthServer()
    super.reset()
  }

  async authenticate(scopes: ExternalAuthProvidersScope[]) {
    const bodyParser = async (body: string) => {
      try {
        const parsedBody = JSON.parse(body)
        if (
          !("access_token" in parsedBody) ||
          !("refresh_token" in parsedBody) ||
          !("token_type" in parsedBody)
        ) {
          throw new Error("Invalid response from auth server")
        }
        this.authData = {
          accessToken: parsedBody.access_token,
          refreshToken: parsedBody.refresh_token,
          tokenType: parsedBody.token_type,
        }
        this.eventEmitter.emit(Events.AuthSuccess)
      } catch {
        this.eventEmitter.emit(Events.AuthError)
      } finally {
        this.killAuthServer()
        this.window?.close()
      }
    }

    await this.createAuthServer(bodyParser)
    const authUrl = this.getAuthUrl(scopes)
    await this.openAuthWindow(authUrl)
  }

  async getContactsData() {
    let contacts: GoogleContact[] = []
    let nextPageToken: string | null = null

    if (!this.authData) {
      throw new Error("No authorization data available")
    }

    do {
      const url = new URL(
        this.dataEndpoints[ExternalAuthProvidersScope.Contacts]
      )
      url.searchParams.set(
        "personFields",
        [
          "names",
          "nicknames",
          "phoneNumbers",
          "emailAddresses",
          "addresses",
          "biographies",
          "organizations",
          "urls",
        ].join(",")
      )
      url.searchParams.set("pageSize", "1000")
      if (nextPageToken) {
        url.searchParams.set("pageToken", nextPageToken)
      }

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `${this.authData.tokenType} ${this.authData.accessToken}`,
        },
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch contacts: ${response.statusText}`)
      }
      const data = await response.json()
      const connections = data.connections || []
      contacts = contacts.concat(connections)
      nextPageToken = data.nextPageToken
    } while (nextPageToken)

    return contacts
  }

  async getCalendarData() {
    return [] as GoogleCalendarEvent[]
  }

  private getAuthUrl(scopes: ExternalAuthProvidersScope[]): string {
    if (!this.clientId) {
      throw new Error("VITE_GOOGLE_AUTH_CLIENT_ID is not defined")
    }

    const scopesParam = this.obtainScopesParam(scopes)
    const url = new URL(this.baseUrl)

    url.searchParams.set("client_id", this.clientId)
    url.searchParams.set("response_type", "code")
    url.searchParams.set("redirect_uri", this.redirectUrl)
    url.searchParams.set("scope", scopesParam)
    url.searchParams.set("access_type", "offline")
    url.searchParams.set("prompt", "consent")

    return url.toString()
  }

  private obtainScopesParam(scopes: ExternalAuthProvidersScope[]) {
    const scopeMappings = {
      [ExternalAuthProvidersScope.Contacts]:
        "https://www.googleapis.com/auth/contacts.readonly",
      [ExternalAuthProvidersScope.Calendar]:
        "https://www.googleapis.com/auth/calendar.readonly",
    }
    const mappedScopes = scopes.map((scope) => scopeMappings[scope])
    return mappedScopes.join(" ")
  }

  private async createAuthServer(
    callback: (body: string) => void | Promise<void>,
    retriesLeft = 1
  ): Promise<void> {
    if (this.authServer) {
      this.killAuthServer()
    }

    if (await checkPort(this.serverPort)) {
      if (retriesLeft <= 0) {
        throw new Error(`Port ${this.serverPort} is already in use.`)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500))
        await this.createAuthServer(callback, retriesLeft - 1)
      }
    }

    this.authServer = http.createServer((req, res) => {
      if (req.method === "POST") {
        let rawData = ""
        res.statusCode = 200
        req.on("data", (chunk) => (rawData += chunk))
        req.on("end", () => callback(rawData))
      } else {
        res.statusCode = 400
      }
      res.end()
    })

    this.authServer.listen(this.serverPort)
  }

  private killAuthServer() {
    if (this.authServer) {
      this.authServer.closeAllConnections()
      this.authServer.close()
      this.authServer = undefined
    }
  }
}
