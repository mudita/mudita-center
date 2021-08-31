/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import { noop } from "App/renderer/utils/noop"
import React from "react"
import AboutUI from "./about-ui.component"

storiesOf("Settings/About", module).add("About", () => (
  <div style={{ maxWidth: "63rem" }}>
    <AboutUI
      openLicense={noop}
      openTermsOfService={noop}
      openPrivacyPolicy={noop}
    />
  </div>
))
