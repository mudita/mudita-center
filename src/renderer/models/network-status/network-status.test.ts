import networkStatus from "Renderer/models/network-status/network-status"
import { init } from "@rematch/core"

test("effect is dispatched and store is updated", async () => {
  const store = init({
    models: { networkStatus },
  })

  await store.dispatch.networkStatus.updateOnlineStatus()

  expect(store.getState()).toEqual({
    networkStatus: {
      online: true,
    },
  })
})
