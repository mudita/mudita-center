/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// the format should stay as it is - it should contain `./` at the beginning
export enum TestFilesPaths {
  messagesInAppNavigationTest = "src/specs/messages/messages-in-app-navigation.e2e.ts",
  helpWindowCheckTest = "src/specs/help/help-window-check.e2e.ts",
  homePageTestDeviceNotConnectedTest = "src/specs/overview/home-page-device-not-connecting.e2e.ts",
  e2eMockSample = "src/specs/overview/e2e-mock-sample.e2e.ts",
  mcCheckForUpdatesTest = "src/specs/settings/mc-version-check-for-updates.e2e.ts",
  newsPageOnlineTest = "src/specs/news/news-check-online.e2e.ts",
  newsPageOfflineTest = "src/specs/news/news-check-offline.e2e.ts",
  termsOfServiceTest = "src/specs/settings/terms-of-service.e2e.ts",
  backupLocationTest = "src/specs/settings/backup-location.e2e.ts",
  mcCheckForUpdatesOfflineTest = "src/specs/settings/mc-version-check-for-updates-offline.e2e.ts",
  privacyPolicyTest = "src/specs/settings/privacy-policy.e2e.ts",
  licenseTest = "src/specs/settings/license.e2e.ts",
  helpWindowCheckOfflineTest = "src/specs/help/help-window-check-offline.e2e.ts",
}
export const toRelativePath = (path: string) => `./${path}`
