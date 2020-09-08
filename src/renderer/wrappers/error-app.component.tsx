import React from "react"
import { History } from "history"
import { Route, Router } from "react-router"

import { FunctionComponent } from "Renderer/types/function-component.interface"
import { URL_MAIN } from "Renderer/constants/urls"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

interface Props {
  history: History
}

const ErrorApp: FunctionComponent<Props> = ({ history }) => (
  <Router history={history}>
    <Route path={URL_MAIN.error}>
      <Text displayStyle={TextDisplayStyle.SecondaryHeading}>Sorry</Text>
    </Route>
  </Router>
)

export default ErrorApp
