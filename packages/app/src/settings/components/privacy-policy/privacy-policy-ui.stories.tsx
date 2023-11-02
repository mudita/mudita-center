import React from "react"
import history from "App/__deprecated__/renderer/routes/history"
import { Router } from "react-router"
import { PrivacyPolicyUI } from "./privacy-policy-ui.component"

export default {
  title: "Views/License",
}

export const License = () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <PrivacyPolicyUI />
    </Router>
  </div>
)
