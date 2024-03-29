/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Route, Router } from "react-router"
import { defineMessages } from "react-intl"
import history from "Core/core/history"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"

const messages = defineMessages({
  errorBody: { id: "module.errorBody" },
})

const ErrorApp: FunctionComponent = () => (
  <Router history={history}>
    <Route path={URL_MAIN.error}>
      <Text
        displayStyle={TextDisplayStyle.Headline2}
        message={messages.errorBody}
      />
    </Route>
  </Router>
)

export default ErrorApp
