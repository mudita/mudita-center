/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Application } from "spectron"
import path from "path"
import electron from "electron"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"

export const startApp = async (simulatePhoneConnection = false) => {
  return await new Application({
    path: (electron as unknown) as string,
    args: [path.join(__dirname, "../..")],
    env: {
      simulatePhoneConnection,
    },
    startTimeout: 10000,
    waitTimeout: 10000,
  }).start()
}

export const stopApp = async (app: any) => {
  if (app && app.isRunning()) {
    return await app.stop()
  }
}

export const enablePhoneSimulation = async (app: any) => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Connecting}]`).click()
}
