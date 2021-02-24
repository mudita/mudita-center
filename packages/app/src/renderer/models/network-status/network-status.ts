/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { RootState } from "Renderer/store"
import { Store } from "Renderer/models/network-status/network-status.interface"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"

const networkStatus = createModel<RootModel>({
  state: {},
  reducers: {
    update(state: Store, payload: any) {
      return { ...state, ...payload }
    },
  },
  effects: (d) => {
    const dispatch = (d as unknown) as RootState

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
