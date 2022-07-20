/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { Redirect, Route, Switch } from "react-router"
import FilesManager from "App/files-manager/files-manager.container"
import Meditation from "App/__deprecated__/renderer/modules/meditation/meditation.component"
import Messages from "App/messages/messages.container"
import Music from "App/__deprecated__/renderer/modules/music/music.component"
import News from "App/news/news.container"
import Overview from "App/overview/overview.container"
import Contacts from "App/contacts/contacts.container"
import Settings from "App/settings/settings.container"
import Tethering from "App/__deprecated__/renderer/modules/tethering/tethering.container"
import {
  URL_MAIN,
  URL_ONBOARDING,
  URL_RECOVERY_MODE,
  URL_TABS,
  URL_OVERVIEW,
} from "App/__deprecated__/renderer/constants/urls"
import Calendar from "App/__deprecated__/calendar/calendar.container"
import Playlist from "App/__deprecated__/renderer/modules/music/tabs/playlist.component"
import Calls from "App/__deprecated__/renderer/modules/phone/tabs/calls-container.component"
import Dial from "App/__deprecated__/renderer/modules/phone/tabs/dial.component"
import VoiceRecorder from "App/__deprecated__/renderer/modules/tools/tabs/voice-recorder.component"
import Notes from "App/__deprecated__/renderer/modules/tools/tabs/notes.container"
import Onboarding from "App/onboarding/onboarding.container"
import Connecting from "App/connecting/connecting.container"
import Troubleshooting from "App/__deprecated__/troubleshooting/troubleshooting.container"
import LayoutDesktopWrapper from "App/__deprecated__/renderer/wrappers/layout-desktop-wrapper"
import LayoutBlankWrapper from "App/__deprecated__/renderer/wrappers/layout-blank-wrapper"
import {
  AboutContainer,
  NotificationsContainer,
  BackupContainer,
  AudioConversionContainer,
} from "App/settings/components"
import RecoveryMode from "App/__deprecated__/recovery-mode/recovery-mode.container"
import PureSystem from "App/overview/components/pure-system/pure-system.container"
import LayoutDesktopWrapperWithoutHeader from "App/__deprecated__/renderer/wrappers/layout-desktop-wrapper-without-header"
import TemplatesContainer from "App/templates/template.container"

export default () => (
  <Switch>
    <Redirect exact from={URL_MAIN.root} to={URL_MAIN.news} />
    <Redirect from={URL_ONBOARDING.root} to={URL_ONBOARDING.welcome} exact />

    <Route exact path={[...Object.values(URL_ONBOARDING)]}>
      <LayoutBlankWrapper>
        <Route path={URL_ONBOARDING.welcome} component={Onboarding} />
        <Route path={URL_ONBOARDING.connecting} component={Connecting} />
        <Route
          path={URL_ONBOARDING.troubleshooting}
          component={Troubleshooting}
        />
        <Route path={URL_RECOVERY_MODE.root} component={RecoveryMode} />
      </LayoutBlankWrapper>
    </Route>

    <Route exact path={URL_OVERVIEW.pureSystem}>
      <LayoutDesktopWrapperWithoutHeader>
        <Route path={URL_OVERVIEW.pureSystem} component={PureSystem} />
      </LayoutDesktopWrapperWithoutHeader>
    </Route>

    <Route exact path={[...Object.values(URL_RECOVERY_MODE)]}>
      <LayoutBlankWrapper recoveryMode>
        <Route path={URL_RECOVERY_MODE.root} component={RecoveryMode} />
      </LayoutBlankWrapper>
    </Route>

    <Route>
      <LayoutDesktopWrapper>
        <Route path={URL_MAIN.filesManager} component={FilesManager} />
        <Route path={URL_MAIN.meditation} component={Meditation} />
        <Route path={URL_MAIN.messages} component={Messages} exact />
        <Route
          path={`${URL_MAIN.messages}${URL_TABS.templates}`}
          component={TemplatesContainer}
        />
        <Route path={URL_MAIN.music} component={Music} exact />
        <Route
          path={`${URL_MAIN.music}${URL_TABS.playlist}`}
          component={Playlist}
        />
        <Route path={URL_MAIN.news} component={News} />
        <Route path={URL_MAIN.calendar} component={Calendar} />
        <Route path={URL_OVERVIEW.root} component={Overview} exact />
        <Route path={URL_MAIN.contacts} component={Contacts} exact />
        <Route path={URL_MAIN.phone} component={Calls} />
        <Route path={`${URL_MAIN.phone}${URL_TABS.dial}`} component={Dial} />
        <Route path={URL_MAIN.settings} component={Settings} exact />
        <Route
          path={`${URL_MAIN.settings}${URL_TABS.notifications}`}
          component={NotificationsContainer}
        />
        <Route
          path={`${URL_MAIN.settings}${URL_TABS.audioConversion}`}
          component={AudioConversionContainer}
        />
        <Route
          path={`${URL_MAIN.settings}${URL_TABS.backup}`}
          component={BackupContainer}
        />
        <Route
          path={`${URL_MAIN.settings}${URL_TABS.about}`}
          component={AboutContainer}
        />
        <Route path={URL_MAIN.tethering} component={Tethering} />
        <Route path={URL_MAIN.tools} component={Notes} exact />
        <Route
          path={`${URL_MAIN.tools}${URL_TABS.voiceRecorder}`}
          component={VoiceRecorder}
        />
      </LayoutDesktopWrapper>
    </Route>

    <Redirect to={URL_OVERVIEW.root} />
  </Switch>
)
