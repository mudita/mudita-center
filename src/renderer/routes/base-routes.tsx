import * as React from "react"
import { Route, Switch } from "react-router"

import HomePage from "Renderer/modules/home/home.page"
import AppWrapper from "Renderer/wrappers/app.wrapper"

import { URL_MAIN } from "Renderer/constants/urls"

export default () => (
  <AppWrapper>
    <Switch>
      <Route path={URL_MAIN.root} component={HomePage} />
    </Switch>
  </AppWrapper>
)
