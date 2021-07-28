/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import AboutUI from "Renderer/modules/settings/tabs/about/about-ui.component"
import { ipcRenderer } from "electron-better-ipc"
import { AboutActions } from "App/common/enums/license-actions.enum"

const About: FunctionComponent = () => {
  const openLicenseWindow = () =>
    ipcRenderer.callMain(AboutActions.LicenseOpenWindow)
  const openTermsOfServiceWindow = () => ipcRenderer.callMain(AboutActions.TermsOpenWindow)
  const openPrivacyPolicyWindow = () => ipcRenderer.callMain(AboutActions.PolicyOpenWindow)
return <AboutUI openLicense={openLicenseWindow} openTermsOfService={openTermsOfServiceWindow} openPrivacyPolicy={openPrivacyPolicyWindow} />
}

export default About
