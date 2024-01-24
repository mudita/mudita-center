/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { Redirect, Route, Switch } from "react-router"
import FilesManager from "Core/files-manager/files-manager.container"
import Meditation from "Core/__deprecated__/renderer/modules/meditation/meditation.component"
import Messages from "Core/messages/messages.container"
import Music from "Core/__deprecated__/renderer/modules/music/music.component"
import News from "Core/news/news.container"
import Overview from "Core/overview/overview.container"
import Contacts from "Core/contacts/contacts.container"
import Tethering from "Core/__deprecated__/renderer/modules/tethering/tethering.container"
import {
  URL_MAIN,
  URL_ONBOARDING,
  URL_OVERVIEW,
  URL_DISCOVERY_DEVICE,
  URL_DEVICE_INITIALIZATION,
  URL_TABS,
} from "Core/__deprecated__/renderer/constants/urls"
import Playlist from "Core/__deprecated__/renderer/modules/music/tabs/playlist.component"
import Calls from "Core/__deprecated__/renderer/modules/phone/tabs/calls-container.component"
import Dial from "Core/__deprecated__/renderer/modules/phone/tabs/dial.component"
import VoiceRecorder from "Core/__deprecated__/renderer/modules/tools/tabs/voice-recorder.component"
import Notes from "Core/__deprecated__/renderer/modules/tools/tabs/notes.container"
import Onboarding from "Core/onboarding/onboarding.container"
import Troubleshooting from "Core/__deprecated__/troubleshooting/troubleshooting.container"
import LayoutDesktopWrapper from "Core/__deprecated__/renderer/wrappers/layout-desktop-wrapper"
import LayoutBlankWrapper from "Core/__deprecated__/renderer/wrappers/layout-blank-wrapper"
import {
  AboutContainer,
  NotificationsContainer,
  BackupContainer,
  AudioConversionContainer,
} from "Core/settings/components"
import PureSystem from "Core/overview/components/pure-system/pure-system.container"
import LayoutDesktopWrapperWithoutHeader from "Core/__deprecated__/renderer/wrappers/layout-desktop-wrapper-without-header"
import TemplatesContainer from "Core/templates/template.container"
import ConfiguredDevicesDiscovery from "Core/discovery-device/components/configured-devices-discovery.component"
import DevicesInitialization from "Core/device-initialization/components/devices-initialization.component"
import AvailableDeviceListContainer from "Core/discovery-device/components/available-device-list.container"
import { APIConnectionDemo } from "device/feature"
import { GenericView } from "generic-view/feature"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => (
  <Switch>
    <Redirect exact from={URL_MAIN.root} to={URL_ONBOARDING.root} />
    <Redirect from={URL_ONBOARDING.root} to={URL_ONBOARDING.welcome} exact />

    <Route exact path={[...Object.values(URL_ONBOARDING)]}>
      <LayoutBlankWrapper>
        <Route path={URL_ONBOARDING.welcome} component={Onboarding} />
        <Route
          path={URL_ONBOARDING.troubleshooting}
          component={Troubleshooting}
        />
      </LayoutBlankWrapper>
    </Route>

    <Route exact path={URL_OVERVIEW.pureSystem}>
      <LayoutDesktopWrapperWithoutHeader>
        <Route path={URL_OVERVIEW.pureSystem} component={PureSystem} />
      </LayoutDesktopWrapperWithoutHeader>
    </Route>

    <Route exact path={[...Object.values(URL_DISCOVERY_DEVICE)]}>
      <LayoutBlankWrapper>
        <Route
          path={URL_DISCOVERY_DEVICE.root}
          component={ConfiguredDevicesDiscovery}
        />
        <Route
          path={URL_DISCOVERY_DEVICE.availableDeviceListModal}
          component={AvailableDeviceListContainer}
        />
      </LayoutBlankWrapper>
    </Route>

    <Route exact path={[...Object.values(URL_DEVICE_INITIALIZATION)]}>
      <LayoutBlankWrapper>
        <Route
          path={URL_DEVICE_INITIALIZATION.root}
          component={DevicesInitialization}
        />
      </LayoutBlankWrapper>
    </Route>

    <Route>
      <LayoutDesktopWrapper>
        <Switch>
          <Route
            path={"/generic/api-connection-demo"}
            component={APIConnectionDemo}
          />
          <Route
            path={"/generic/:viewKey/:subviewKey"}
            component={GenericView}
          />
          <Route path={"/generic/:viewKey"} component={GenericView} />
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
          <Route path={URL_OVERVIEW.root} component={Overview} exact />
          <Route path={URL_MAIN.contacts} component={Contacts} exact />
          <Route path={URL_MAIN.phone} component={Calls} />
          <Route path={`${URL_MAIN.phone}${URL_TABS.dial}`} component={Dial} />
          <Route path={URL_MAIN.settings} component={BackupContainer} exact />
          <Route
            path={`${URL_MAIN.settings}${URL_TABS.notifications}`}
            component={NotificationsContainer}
          />
          <Route
            path={`${URL_MAIN.settings}${URL_TABS.audioConversion}`}
            component={AudioConversionContainer}
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
        </Switch>
      </LayoutDesktopWrapper>
    </Route>

    <Redirect to={URL_OVERVIEW.root} />
  </Switch>
)
