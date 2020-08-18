import { storiesOf } from "@storybook/react"
import React from "react"
import { helpSeed } from "App/seeds/help"
import Help from "Renderer/modules/help/help.component"
import history from "Renderer/routes/history"
import { Router } from "react-router"
import { noop } from "Renderer/utils/noop"

storiesOf("Views|Help", module).add("Help", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <Help list={helpSeed.list} searchQuestion={noop} />
    </Router>
  </div>
))
