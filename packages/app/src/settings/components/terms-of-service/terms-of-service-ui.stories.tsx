import React from "react"
import history from "App/__deprecated__/renderer/routes/history"
import { Router } from "react-router"
import { TermsOfServiceUI } from "App/settings/components/terms-of-service/terms-of-service-ui.component"

export default {
  title: "Views/License",
}

export const License = () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <TermsOfServiceUI />
    </Router>
  </div>
)
