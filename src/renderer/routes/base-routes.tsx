import * as React from "react"
import { Redirect, Route, Switch } from "react-router"

import LayoutDesktopWrapper from "Renderer/wrappers/layout-desktop-wrapper"

import FilesManager from "Renderer/modules/filesManager/files-manager.component"
import Help from "Renderer/modules/help/help.component"
import Meditation from "Renderer/modules/meditation/meditation.component"
import MessagesContainer from "Renderer/modules/messages/messages.container"
import Music from "Renderer/modules/music/music.component"
import News from "Renderer/modules/news/news.component"
import OverviewContainer from "Renderer/modules/overview/overview.container"
import PhoneContainer from "Renderer/modules/phone/phone.container"
import Settings from "Renderer/modules/settings/settings.component"
import Tethering from "Renderer/modules/tethering/tethering.component"
import Tools from "Renderer/modules/tools/tools.component"

import { URL_MAIN, URL_TABS } from "Renderer/constants/urls"
import Calendar from "Renderer/modules/calendar/calendar.component"
import Templates from "Renderer/modules/messages/tabs/templates.component"
import Playlist from "Renderer/modules/music/tabs/playlist.component"
import Calls from "Renderer/modules/phone/tabs/calls.component"
import Dial from "Renderer/modules/phone/tabs/dial.component"

export default () => (
  <LayoutDesktopWrapper>
    <Switch>
      <Redirect exact from={URL_MAIN.root} to={URL_MAIN.overview} />
      <Route path={URL_MAIN.filesManager} component={FilesManager} />
      <Route path={URL_MAIN.help} component={Help} />
      <Route path={URL_MAIN.meditation} component={Meditation} />
      <Route
        path={`${URL_MAIN.messages}${URL_TABS.templates}`}
        component={Templates}
      />
      <Route path={URL_MAIN.messages} component={MessagesContainer} />
      <Route
        path={`${URL_MAIN.music}${URL_TABS.playlist}`}
        component={Playlist}
      />
      <Route path={URL_MAIN.music} component={Music} />
      <Route path={URL_MAIN.news} component={News} />
      <Route path={URL_MAIN.calendar} component={Calendar} />
      <Route path={URL_MAIN.overview} component={OverviewContainer} />
      <Route path={`${URL_MAIN.phone}${URL_TABS.calls}`} component={Calls} />
      <Route path={`${URL_MAIN.phone}${URL_TABS.dial}`} component={Dial} />
      <Route path={URL_MAIN.phone} component={PhoneContainer} />
      <Route path={URL_MAIN.settings} component={Settings} />
      <Route path={URL_MAIN.tethering} component={Tethering} />
      <Route path={URL_MAIN.tools} component={Tools} />
      <Redirect to={URL_MAIN.overview} />
    </Switch>
  </LayoutDesktopWrapper>
)
