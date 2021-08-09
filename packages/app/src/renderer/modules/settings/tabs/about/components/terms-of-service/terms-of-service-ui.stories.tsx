/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import history from "Renderer/routes/history"
import { Router } from "react-router"
import TermsOfServiceUI from "./terms-of-service-ui.component"

storiesOf("Views/License", module).add("License", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <TermsOfServiceUI />
    </Router>
  </div>
))
