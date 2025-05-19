/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppActions } from "app-utils/renderer"
import { FunctionComponent } from "react"
import { About } from "settings/ui"

export const SettingsAboutPage: FunctionComponent = () => {
  const legalWindows = {
    license: {
      path: "/license",
      title: "Mudita Center - License",
    },
    terms: {
      path: "/terms-of-service",
      title: "Mudita Center - Terms of Service",
    },
    policy: {
      path: "/privacy-policy",
      title: "Mudita Center - Privacy Policy",
    },
  }

  const openLicenseWindow = () => {
    AppActions.openLegalWindow(
      legalWindows.license.path,
      legalWindows.license.title
    )
  }

  const openTermsOfServiceWindow = () => {
    AppActions.openLegalWindow(
      legalWindows.terms.path,
      legalWindows.terms.title
    )
  }

  const openPrivacyPolicyWindow = () => {
    AppActions.openLegalWindow(
      legalWindows.policy.path,
      legalWindows.policy.title
    )
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
