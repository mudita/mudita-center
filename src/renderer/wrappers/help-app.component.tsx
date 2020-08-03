import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Route, Router, Switch } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"
import Answer from "Renderer/modules/help/answer.component"
import Help from "Renderer/modules/help/help.container"
import { History } from "history"

interface Props {
  history: History
}

const HelpApp: FunctionComponent<Props> = ({ history }) => (
  <Router history={history}>
    <Switch>
      <Route path={`${URL_MAIN.help}/:questionId`} component={Answer} />
      <Route path={URL_MAIN.help} component={Help} />
    </Switch>
  </Router>
)

export default HelpApp
