/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import { helpSeed } from "App/__deprecated__/seeds/help"
import Help from "App/help/components/help.component"
import history from "App/__deprecated__/renderer/routes/history"
import { Router } from "react-router"
import { noop } from "App/__deprecated__/renderer/utils/noop"

storiesOf("Views/Help", module).add("Help", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <Help
        list={helpSeed.list}
        searchQuestion={noop}
        openContactSupportFlow={noop}
      />
    </Router>
  </div>
))
