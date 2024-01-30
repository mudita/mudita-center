/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { PrivacyPolicyUI } from "Core/settings/components"

storiesOf("Views/License", module).add("License", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router >
      <PrivacyPolicyUI />
    </Router>
  </div>
))
