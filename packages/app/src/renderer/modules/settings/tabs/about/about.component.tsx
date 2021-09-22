/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import AboutUI from "Renderer/modules/settings/tabs/about/about-ui.component"
import { ipcRenderer } from "electron-better-ipc"
import { AboutActions } from "App/common/enums/about-actions.enum"
import checkAppUpdateRequest from "Renderer/requests/check-app-update.request"

interface Props {
  appLatestVersion?: string
  appCurrentVersion?: string
  appUpdateAvailable?: boolean
  appUpdateStepModalShow?: boolean
  setAppUpdateStepModalDisplayed: () => void
  toggleAppUpdateAvailable: (appUpdateAvailable: boolean) => void
  toggleAppUpdateStepModalShow: (value: boolean) => void
}
const About: FunctionComponent<Props> = ({
  appLatestVersion,
  appCurrentVersion,
  appUpdateAvailable,
  setAppUpdateStepModalDisplayed,
  toggleAppUpdateAvailable,
  toggleAppUpdateStepModalShow,
  appUpdateStepModalShow,
}) => {
  const openLicenseWindow = () =>
    ipcRenderer.callMain(AboutActions.LicenseOpenWindow)
  const openTermsOfServiceWindow = () =>
    ipcRenderer.callMain(AboutActions.TermsOpenWindow)
  const openPrivacyPolicyWindow = () =>
    ipcRenderer.callMain(AboutActions.PolicyOpenWindow)

    const handleAppUpdateAvailableCheck = (): void => {
      if (!window.navigator.onLine) {
        setAppUpdateStepModalDisplayed()
        toggleAppUpdateAvailable(false)
      } else {
        void checkAppUpdateRequest()
        toggleAppUpdateStepModalShow(true)
      }
    }
    const closeUpToDateModal = (): void => {
      toggleAppUpdateStepModalShow(false)
    }
  return (
    <AboutUI
      openLicense={openLicenseWindow}
      openTermsOfService={openTermsOfServiceWindow}
      openPrivacyPolicy={openPrivacyPolicyWindow}
      appLatestVersion={appLatestVersion}
      appCurrentVersion={appCurrentVersion}
      appUpdateAvailable={appUpdateAvailable}
      click={handleAppUpdateAvailableCheck}
      closeUpToDateModal={closeUpToDateModal}
      appUpdateStepModalShow={appUpdateStepModalShow}
    />
  )
}

export default About
