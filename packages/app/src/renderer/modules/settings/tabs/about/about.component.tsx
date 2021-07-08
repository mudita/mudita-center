/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import AboutUI from "Renderer/modules/settings/tabs/about/about-ui.component"
import { ipcRenderer } from "electron-better-ipc"
import { LicenseActions } from "App/common/enums/license-actions.enum"

const About: FunctionComponent = () => {
  const openLicenseWindow = () => ipcRenderer.callMain(LicenseActions.OpenWindow)
  return (
    <AboutUI openLicense={openLicenseWindow }/>
  )
}

export default About
