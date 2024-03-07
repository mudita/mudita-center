/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  TestFilesPaths,
  toRelativePath,
} from "../src/test-filenames/consts/test-filenames.const"

const NO_FILTERED_SPECS = [
  { path: toRelativePath(TestFilesPaths.mcVersionCheckTest), supportsCI: false },
  {
    path: toRelativePath(TestFilesPaths.displayInitialOsVersionTest),
    supportsCI: true,
  },
  {
    path: toRelativePath(TestFilesPaths.checkForUpdateTest),
    supportsCI: false,
  },
  { path: toRelativePath(TestFilesPaths.deviceUpdateTest), supportsCI: false },
  { path: toRelativePath(TestFilesPaths.contactsListTest), supportsCI: false },
  {
    path: toRelativePath(TestFilesPaths.contactsInAppNavigationTest),
    supportsCI: false,
  },
  {
    path: toRelativePath(TestFilesPaths.messagesInAppNavigationTest),
    supportsCI: false,
  },
  {
    path: toRelativePath(TestFilesPaths.newsInAppNavigationTest),
    supportsCI: false,
  },
  {
    path: toRelativePath(TestFilesPaths.overviewInAppNavigationTest),
    supportsCI: false,
  },
  {
    path: toRelativePath(TestFilesPaths.settingsInAppNavigationTest),
    supportsCI: false,
  },
  {
    path: toRelativePath(TestFilesPaths.helpWindowCheckTest),
    supportsCI: false,
  },
  {
    path: toRelativePath(TestFilesPaths.sarWindowCheckTest),
    supportsCI: false,
  },
  {
    path: toRelativePath(TestFilesPaths.tosPrivacyLicenceWindowsCheckTest),
    supportsCI: false,
  },
  { path: toRelativePath(TestFilesPaths.messageSendTest), supportsCI: false },
]

const isCIEnvironment = process.env.CI === "true"

const SPECS = NO_FILTERED_SPECS
  .filter(({ supportsCI }) => isCIEnvironment ? supportsCI : true)
  .map(({ path }) => path);

export default SPECS
