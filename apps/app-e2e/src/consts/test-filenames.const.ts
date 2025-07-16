/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// the format should stay as it is - it should contain `./` at the beginning
export enum TestFilesPaths {
  about = "src/specs/about.e2e.ts",
  appInit = "src/specs/app-init.e2e.ts",
  backup = "src/specs/backup.e2e.ts",
  contactSupportBase = "src/specs/contact-support-base.e2e.ts",
  contactSupportFailurePath = "src/specs/contact-support-failure-path.e2e.ts",
  contactSupportHappyPath = "src/specs/contact-support-happy-path.e2e.ts",
  devicesWelcome = "src/specs/devices-welcome.e2e.ts",
  news = "src/specs/news.e2e.ts",
  welcomeScreen = "src/specs/welcome-screen.e2e.ts",
  mcSoftUpdateAvailable = "src/specs/mc-soft-update-available.e2e.ts",
  mcForceUpdateAvailable = "src/specs/mc-force-update-available.e2e.ts",
}

export const toRelativePath = (path: string) => `./${path}`
