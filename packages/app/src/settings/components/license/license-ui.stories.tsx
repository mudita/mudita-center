import React from "react"
import history from "App/__deprecated__/renderer/routes/history"
import { Router } from "react-router"
import { LicenseUI } from "./license-ui.component"

export default {
  title: "Views/License",
}

export const License = () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <LicenseUI />
    </Router>
  </div>
)
