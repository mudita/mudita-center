/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import auth from "Core/__deprecated__/renderer/models/auth/auth"
import networkStatus from "Core/__deprecated__/renderer/models/network-status/network-status"

export interface RootModel {
  auth: typeof auth
  networkStatus: typeof networkStatus
}

export const models: RootModel = {
  auth,
  networkStatus,
}
