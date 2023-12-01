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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update(state: Store, payload: any) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return { ...state, ...payload }
    },
  },
  effects: (d) => {
    const dispatch = d as unknown as RootState

    return {
      updateOnlineStatus() {
        const online = navigator.onLine
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        dispatch.networkStatus.update({
          online,
        })
      },
    }
  },
})

export default networkStatus
