import React from "react"

import FunctionComponent from "Renderer/types/function-component.interface"
import { Link } from "react-router-dom"
import { URL_ONBOARDING } from "Renderer/constants/urls"

const Settings: FunctionComponent = () => (
  <div>
    Settings
    <br />
    <Link to={URL_ONBOARDING.root}>Go to onboarding</Link>
  </div>
)

export default Settings
