/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { About } from "settings/ui"

export const SettingsAboutPage: FunctionComponent = () => {
  const openLicenseWindow = () => {
    console.log("Open License")
  }

  const openTermsOfServiceWindow = () => {
    console.log("Open Terms of Service")
  }

  const openPrivacyPolicyWindow = () => {
    console.log("Open Privacy Policy")
  }

  const handleAppUpdateAvailableCheck = () => {
    console.log("On App Update Available Check")
  }

  const hideAppUpdateNotAvailable = () => {
    console.log("Hide App Update Not Available")
  }

  const latestVersion = "1.2.3"
  const currentVersion = "3.4.5"
  const updateAvailable = true
  const appUpdateNotAvailableShow = true
  const checkingForUpdate = false

  return (
    <About
      openLicense={openLicenseWindow}
      openTermsOfService={openTermsOfServiceWindow}
      openPrivacyPolicy={openPrivacyPolicyWindow}
      appLatestVersion={latestVersion}
      appCurrentVersion={currentVersion}
      appUpdateAvailable={updateAvailable}
      onAppUpdateAvailableCheck={handleAppUpdateAvailableCheck}
      appUpdateNotAvailableShow={appUpdateNotAvailableShow}
      hideAppUpdateNotAvailable={hideAppUpdateNotAvailable}
      checkingForUpdate={checkingForUpdate}
    />
  )
}
