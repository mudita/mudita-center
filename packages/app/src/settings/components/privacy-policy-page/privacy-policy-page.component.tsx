/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { History } from "history"
import { Route, Router } from "react-router"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"
import styled from "styled-components"
import { width } from "App/__deprecated__/renderer/styles/theming/theme-getters"

const StyledIFrame = styled.iframe`
  width: 100%;
  height: calc(100vh - ${width("scrollbar")});
  border: unset;
`

interface Props {
  history: History
}

const PrivacyPolicyPage: FunctionComponent<Props> = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={URL_MAIN.privacyPolicyBrowser}>
        <StyledIFrame
          src={`${
            process.env.MUDITA_CENTER_SERVER_URL ?? ""
          }/privacy-policy-url`}
          title="Privacy Policy"
        ></StyledIFrame>
      </Route>
    </Router>
  )
}

export default PrivacyPolicyPage
