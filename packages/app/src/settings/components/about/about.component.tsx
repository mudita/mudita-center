/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState, useEffect } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import AboutUI from "App/settings/components/about/about-ui.component"
import { ipcRenderer } from "electron-better-ipc"
import { AboutActions } from "App/__deprecated__/common/enums/about-actions.enum"

interface Props {
  latestVersion?: string
  currentVersion?: string
  updateAvailable?: boolean
  checkingForUpdate: boolean
  checkUpdateAvailable: () => void
}

export const About: FunctionComponent<Props> = ({
  latestVersion,
  currentVersion,
  updateAvailable,
  checkingForUpdate,
  checkUpdateAvailable,
}) => {
  const [appUpdateNotAvailableShow, setAppUpdateNotAvailableShow] =
    useState(false)
  const [appUpdateFailedShow, setAppUpdateFailedShow] = useState(false)

  const openLicenseWindow = () =>
    ipcRenderer.callMain(AboutActions.LicenseOpenWindow)
  const openTermsOfServiceWindow = () =>
    ipcRenderer.callMain(AboutActions.TermsOpenWindow)
  const openPrivacyPolicyWindow = () =>
    ipcRenderer.callMain(AboutActions.PolicyOpenWindow)

  const hideAppUpdateNotAvailable = () => {
    setAppUpdateNotAvailableShow(false)
  }

  const hideAppUpdateFailed = () => {
    setAppUpdateFailedShow(false)
  }

  useEffect(() => {
    setAppUpdateNotAvailableShow(updateAvailable === false)
  }, [updateAvailable, checkingForUpdate])

  const handleAppUpdateAvailableCheck = (): void => {
    if (!window.navigator.onLine) {
      setAppUpdateFailedShow(true)
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
      appUpdateNotAvailableShow={appUpdateNotAvailableShow}
      hideAppUpdateNotAvailable={hideAppUpdateNotAvailable}
      checkingForUpdate={checkingForUpdate}
      appUpdateFailedShow={appUpdateFailedShow}
      hideAppUpdateFailed={hideAppUpdateFailed}
    />
  )
}
