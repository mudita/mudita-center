import React from "react"
import { helpSeed } from "App/__deprecated__/seeds/help"
import Help from "App/help/components/help.component"
import history from "App/__deprecated__/renderer/routes/history"
import { Router } from "react-router"
import { noop } from "App/__deprecated__/renderer/utils/noop"

export default {
  title: "Views/Help",
}

export const _Help = () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <Help
        list={helpSeed.list}
        searchQuestion={noop}
        openContactSupportFlow={noop}
      />
    </Router>
  </div>
)
