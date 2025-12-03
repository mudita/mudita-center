/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ExternalAuthProvidersScope {
  Contacts = "contacts",
  Calendar = "calendar",
}

export interface ExternalAuthProvidersAuthorizationData {
  accessToken: string
  refreshToken: string
  tokenType: string
}
