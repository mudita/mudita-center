/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import AboutUI from "Renderer/modules/settings/tabs/about/about-ui.component"
import { ipcRenderer } from "electron-better-ipc"
import { AboutActions } from "App/common/enums/about-actions.enum"

interface Props {
  appLatestVersion?: string
  appCurrentVersion?: string
  appUpdateAvailable?: boolean
  appUpdateFlowShow?: boolean
  checkAppUpdateAvailable: () => void
  toggleAppUpdateAvailable: (appUpdateAvailable: boolean) => void
}

//TODO: Fix tests
const About: FunctionComponent<Props> = ({
  appLatestVersion,
  appCurrentVersion,
  appUpdateAvailable,
  appUpdateFlowShow,
  checkAppUpdateAvailable,
  toggleAppUpdateAvailable,
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
      toggleAppUpdateAvailable(false)
    } else {
      checkAppUpdateAvailable()
    }
  }

  return (
    <AboutUI
      openLicense={openLicenseWindow}
      openTermsOfService={openTermsOfServiceWindow}
      openPrivacyPolicy={openPrivacyPolicyWindow}
      appLatestVersion={appLatestVersion}
      appCurrentVersion={appCurrentVersion}
      appUpdateAvailable={appUpdateAvailable}
      onAppUpdateAvailableCheck={handleAppUpdateAvailableCheck}
      appUpdateNotAvailableShow={checking && appUpdateAvailable === false}
      hideAppUpdateNotAvailable={hideAppUpdateNotAvailable}
    />
  )
}

export default About
