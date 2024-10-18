/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// the format should stay as it is - it should contain `./` at the beginning
export enum TestFilesPaths {
  messagesInAppNavigationTest = "src/specs/messages/messages-in-app-navigation.e2e.ts",
  helpSectionCheckTest = "src/specs/help/help-section-check.e2e.ts",
  helpSectionCheckTestOffline = "src/specs/help/help-section-check-offline.e2e.ts",
  homePageTestDeviceNotConnectedTest = "src/specs/overview/home-page-device-not-connecting.e2e.ts",
  e2eMockSample = "src/specs/overview/e2e-mock-sample.e2e.ts",
  mcCheckForUpdatesTest = "src/specs/settings/mc-version-check-for-updates.e2e.ts",
  newsPageOnlineTest = "src/specs/news/news-check-online.e2e.ts",
  newsMoreNews = "src/specs/news/more-news.e2e.ts",
  newsPageOfflineTest = "src/specs/news/news-check-offline.e2e.ts",
  termsOfServiceTest = "src/specs/settings/terms-of-service.e2e.ts",
  backupLocationTest = "src/specs/settings/backup-location.e2e.ts",
  mcCheckForUpdatesOfflineTest = "src/specs/settings/mc-version-check-for-updates-offline.e2e.ts",
  privacyPolicyTest = "src/specs/settings/privacy-policy.e2e.ts",
  licenseTest = "src/specs/settings/license.e2e.ts",
  mcHomePageForceUpdateTest = "src/specs/overview/e2e-mock-mc-force-update-available.e2e.ts",
  mcHomePageForceUpdateErrorTest = "src/specs/overview/e2e-mock-mc-force-update-error.e2e.ts",
  mcHomePageSoftUpdateTest = "src/specs/overview/e2e-mock-mc-soft-update-available.e2e.ts",
  mcHomePageSoftUpdateErrorTest = "src/specs/overview/e2e-mock-mc-soft-update-error.e2e.ts",
  kompaktOverview = "src/specs/overview/kompakt-overview.ts",
  kompaktSwitchingDevices = "src/specs/overview/kompakt-switching-devices.ts",
  kompaktAbout = "src/specs/overview/kompakt-about.ts",
  kompaktConnectedDevicesModalStressTest = "src/specs/stress-tests/connected-devices-stress-test.ts",
  kompaktDrawerStressTest = "src/specs/stress-tests/device-drawer-stress-test.ts",
  contactSupportUnhappyPath = "src/specs/help/contact-support-unhappy-path.ts",
  kompaktBackupModalGettingInitialInfo = "src/specs/overview/kompakt-backup-getting-initial-info.ts",
  helpVerifyFeedback = "src/specs/help/help-verify-feedback.ts",
  helpSectionSearchNoResults = "src/specs/help/help-section-search-noresults.e2e.ts",
}
export const toRelativePath = (path: string) => `./${path}`
