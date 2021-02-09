/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Application } from "spectron"
import path from "path"
import electron from "electron"
import { OnboardingWelcomeTestIds } from "Renderer/components/rest/onboarding/onboarding-welcome-test-ids.enum"

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
  await app.client
    .$(`*[data-testid=${OnboardingWelcomeTestIds.SimulatePhoneButton}]`)
    .click()
}
