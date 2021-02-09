/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { History } from "history"
import { Route, Router } from "react-router"
import { defineMessages } from "react-intl"

import { FunctionComponent } from "Renderer/types/function-component.interface"
import { URL_MAIN } from "Renderer/constants/urls"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const messages = defineMessages({
  errorBody: { id: "view.name.errorBody" },
})

interface Props {
  history: History
}

const ErrorApp: FunctionComponent<Props> = ({ history }) => (
  <Router history={history}>
    <Route path={URL_MAIN.error}>
      <Text
        displayStyle={TextDisplayStyle.SecondaryHeading}
        message={messages.errorBody}
      />
    </Route>
  </Router>
)

export default ErrorApp
