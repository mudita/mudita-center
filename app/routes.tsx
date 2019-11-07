import * as React from "react"
import { Route, Switch } from "react-router"
import AppContainer from "./containers/app.container"
import FilesPage from "./files/pages/files/files.page"
import FilesPageHook from "./fileshook/pages/files-hook/files-hook.page"
import HomePage from "./home/pages/home/home.page"

export default () => (
  <AppContainer>
    <Switch>
      <Route path="/filesHooks" component={FilesPageHook} />
      <Route path="/files" component={FilesPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </AppContainer>
)
