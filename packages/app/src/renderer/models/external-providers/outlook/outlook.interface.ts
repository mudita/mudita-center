/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export interface OutlookAuthSuccessResponse {
  access_token: string
  refresh_token?: string
}

export enum OutLookScope {
  Contacts = "contacts",
}

export interface OutlookProviderState {
  [OutLookScope.Contacts]: Partial<OutlookAuthSuccessResponse>
}
