/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import { helpSeed } from "Core/__deprecated__/seeds/help"
import Help from "Core/help/components/help.component"
import { BrowserRouter as Router } from "react-router-dom"
import { noop } from "Core/__deprecated__/renderer/utils/noop"

storiesOf("Views/Help", module).add("Help", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router>
      <Help
        list={helpSeed.list}
        searchQuestion={noop}
        openContactSupportFlow={noop}
      />
    </Router>
  </div>
))
