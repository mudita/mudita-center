import { noop } from "App/__deprecated__/renderer/utils/noop"
import React from "react"
import AboutUI from "./about-ui.component"

export default {
  title: "Settings/About",
}

export const About = () => (
  <div style={{ maxWidth: "63rem" }}>
    <AboutUI
      openLicense={noop}
      openTermsOfService={noop}
      openPrivacyPolicy={noop}
      hideAppUpdateNotAvailable={noop}
      onAppUpdateAvailableCheck={noop}
      checkingForUpdate={false}
      appUpdateFailedShow={false}
      hideAppUpdateFailed={noop}
    />
  </div>
)
