import * as React from "react"
import { Redirect, Switch } from "react-router"

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
import AudioConversion from "Renderer/modules/settings/tabs/audio-conversion.component"
import Notifications from "Renderer/modules/settings/tabs/notifcations.component"
import VoiceRecorder from "Renderer/modules/tools/tabs/voice-recorder.component"
import AppRoute from "Renderer/routes/app-route"

export default () => (
  <Switch>
    <Redirect exact from={URL_MAIN.root} to={URL_MAIN.overview} />
    <AppRoute path={URL_MAIN.filesManager} component={FilesManager} />
    <AppRoute path={URL_MAIN.help} component={Help} />
    <AppRoute path={URL_MAIN.meditation} component={Meditation} />
    <AppRoute path={URL_MAIN.messages} component={MessagesContainer} exact />
    <AppRoute
      path={`${URL_MAIN.messages}${URL_TABS.templates}`}
      component={Templates}
    />
    <AppRoute path={URL_MAIN.music} component={Music} exact />
    <AppRoute
      path={`${URL_MAIN.music}${URL_TABS.playlist}`}
      component={Playlist}
    />
    <AppRoute path={URL_MAIN.news} component={News} />
    <AppRoute path={URL_MAIN.calendar} component={Calendar} />
    <AppRoute path={URL_MAIN.overview} component={OverviewContainer} />
    <AppRoute path={URL_MAIN.phone} component={PhoneContainer} exact />
    <AppRoute path={`${URL_MAIN.phone}${URL_TABS.calls}`} component={Calls} />
    <AppRoute path={`${URL_MAIN.phone}${URL_TABS.dial}`} component={Dial} />
    <AppRoute path={URL_MAIN.settings} component={Settings} exact />
    <AppRoute
      path={`${URL_MAIN.settings}${URL_TABS.notifications}`}
      component={Notifications}
    />
    <AppRoute
      path={`${URL_MAIN.settings}${URL_TABS.audioConversion}`}
      component={AudioConversion}
    />
    <AppRoute path={URL_MAIN.tethering} component={Tethering} />
    <AppRoute path={URL_MAIN.tools} component={Tools} exact />
    <AppRoute
      path={`${URL_MAIN.tools}${URL_TABS.voiceRecorder}`}
      component={VoiceRecorder}
    />
    <Redirect to={URL_MAIN.overview} />
  </Switch>
)
