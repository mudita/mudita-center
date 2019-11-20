import * as React from "react"
import { Redirect, Route, Switch } from "react-router"

import AppWrapper from "Renderer/wrappers/app-wrapper"

import FilesManager from "Renderer/modules/filesManager"
import Help from "Renderer/modules/help"
import Meditation from "Renderer/modules/meditation"
import Messages from "Renderer/modules/messages"
import Music from "Renderer/modules/music"
import Overview from "Renderer/modules/overview"
import Phone from "Renderer/modules/phone"
import Settings from "Renderer/modules/settings"
import Tethering from "Renderer/modules/tethering"
import Tools from "Renderer/modules/tools"

import { URL_MAIN } from "Renderer/constants/urls"

export default () => (
  <AppWrapper>
    <Switch>
      <Redirect exact from={URL_MAIN.root} to={URL_MAIN.overview} />
      <Route path={URL_MAIN.filesManager} component={FilesManager} />
      <Route path={URL_MAIN.help} component={Help} />
      <Route path={URL_MAIN.meditation} component={Meditation} />
      <Route path={URL_MAIN.messages} component={Messages} />
      <Route path={URL_MAIN.music} component={Music} />
      <Route path={URL_MAIN.overview} component={Overview} />
      <Route path={URL_MAIN.phone} component={Phone} />
      <Route path={URL_MAIN.settings} component={Settings} />
      <Route path={URL_MAIN.tethering} component={Tethering} />
      <Route path={URL_MAIN.tools} component={Tools} />
    </Switch>
  </AppWrapper>
)
