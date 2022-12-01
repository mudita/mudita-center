/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import AboutUI from "App/settings/components/about/about-ui.component"
import { ipcRenderer } from "electron-better-ipc"
import { AboutActions } from "App/__deprecated__/common/enums/about-actions.enum"

interface Props {
  latestVersion?: string
  currentVersion?: string
  updateAvailable?: boolean
  checkUpdateAvailable: () => void
  toggleUpdateAvailable: (appUpdateAvailable: boolean) => void
}

export const About: FunctionComponent<Props> = ({
  latestVersion,
  currentVersion,
  updateAvailable,
  checkUpdateAvailable,
  toggleUpdateAvailable,
}) => {
  const [checking, setChecking] = useState(false)
  const openLicenseWindow = () =>
    ipcRenderer.callMain(AboutActions.LicenseOpenWindow)
  const openTermsOfServiceWindow = () =>
    ipcRenderer.callMain(AboutActions.TermsOpenWindow)
  const openPrivacyPolicyWindow = () =>
    ipcRenderer.callMain(AboutActions.PolicyOpenWindow)

  const hideAppUpdateNotAvailable = () => {
    setChecking(false)
  }

  const handleAppUpdateAvailableCheck = (): void => {
    setChecking(true)
    if (!window.navigator.onLine) {
      toggleUpdateAvailable(false)
    } else {
      checkUpdateAvailable()
    }
  }

  return (
    <AboutUI
      openLicense={openLicenseWindow}
      openTermsOfService={openTermsOfServiceWindow}
      openPrivacyPolicy={openPrivacyPolicyWindow}
      appLatestVersion={latestVersion}
      appCurrentVersion={currentVersion}
      appUpdateAvailable={updateAvailable}
      onAppUpdateAvailableCheck={handleAppUpdateAvailableCheck}
      appUpdateNotAvailableShow={checking && updateAvailable === false}
      hideAppUpdateNotAvailable={hideAppUpdateNotAvailable}
    />
  )
}
