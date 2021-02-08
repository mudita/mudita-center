/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import networkStatus from "Renderer/models/network-status/network-status"
import { init } from "@rematch/core"

test("effect is dispatched and store is updated - false return variant", async () => {
  const onLine = jest.spyOn(window.navigator, "onLine", "get")
  onLine.mockReturnValue(false)

  const store = init({
    models: { networkStatus },
  })

  await store.dispatch.networkStatus.updateOnlineStatus()

  expect(store.getState()).toEqual({
    networkStatus: {
      online: false,
    },
  })

  onLine.mockRestore()
})

test("effect is dispatched and store is updated - true return variant", async () => {
  const onLine = jest.spyOn(window.navigator, "onLine", "get")
  onLine.mockReturnValue(true)

  const store = init({
    models: { networkStatus },
  })

  await store.dispatch.networkStatus.updateOnlineStatus()

  expect(store.getState()).toEqual({
    networkStatus: {
      online: true,
    },
  })

  onLine.mockRestore()
})
