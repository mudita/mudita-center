/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// the format should stay as it is - it should contain `./` at the beginning
export enum TestFilesPaths {
  displayInitialOsVersionTest = "src/specs/overview/display-initial-os-version.e2e.ts",
  checkForUpdateTest = "src/specs/overview/check-for-update.e2e.ts",
  deviceUpdateTest = "src/specs/overview/device-update.e2e.ts",
  mcVersionCheckTest = "src/specs/settings/mc-version-check.e2e.ts",
  contactsInAppNavigationTest = "src/specs/contacts/contacts-in-app-navigation.e2e.ts",
  messagesInAppNavigationTest = "src/specs/messages/messages-in-app-navigation.e2e.ts",
  newsInAppNavigationTest = "src/specs/news/news-in-app-navigation.e2e.ts",
  overviewInAppNavigationTest = "src/specs/overview/overview-in-app-navigation.e2e.ts",
  settingsInAppNavigationTest = "src/specs/settings/settings-in-app-navigation.e2e.ts",
  helpWindowCheckTest = "src/specs/help/help-window-check.e2e.ts",
  sarWindowCheckTest = "src/specs/overview/sar-window-check.e2e.ts",
  tosPrivacyLicenceWindowsCheckTest = "src/specs/settings/tos-privacy-licence-windows-check.e2e.ts",
  messageSendTest = "src/specs/messages/messages-send.e2e.ts",
  contactsListTest = "src/specs/contacts/contacts-list.e2e.ts",
}

export const toRelativePath = (path: string) => `./${path}`
