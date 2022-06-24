/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RootState } from "App/__deprecated__/renderer/store"
import { Store } from "App/__deprecated__/renderer/models/network-status/network-status.interface"
import { createModel } from "@rematch/core"
import { RootModel } from "App/__deprecated__/renderer/models/models"

const networkStatus = createModel<RootModel>({
  state: {},
  reducers: {
    update(state: Store, payload: any) {
      return { ...state, ...payload }
    },
  },
  effects: (d) => {
    const dispatch = d as unknown as RootState

    return {
      updateOnlineStatus() {
        const online = navigator.onLine
        dispatch.networkStatus.update({
          online,
        })
      },
    }
  },
})

export default networkStatus
