/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"

export const ExternalAuthProviders = {
  getAuthorizationData: window.api.externalAuthProviders.getAuthorizationData,
  getScopesData: window.api.externalAuthProviders.getScopesData,
  listenToScopesDataTransferStart:
    window.api.externalAuthProviders.listenToScopesDataTransferStart,
}
