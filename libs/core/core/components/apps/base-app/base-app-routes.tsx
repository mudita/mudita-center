/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { Redirect, Route, Switch } from "react-router"
import FilesManager from "Core/files-manager/components/files-manager.component"
import Messages from "Core/messages/messages.container"
import News from "Core/news/news.container"
import Overview from "Core/overview/overview.container"
import Contacts from "Core/contacts/contacts.container"
import {
  URL_DEVICE_INITIALIZATION,
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
  URL_ONBOARDING,
  URL_OVERVIEW,
  URL_TABS,
} from "Core/__deprecated__/renderer/constants/urls"
import Onboarding from "Core/onboarding/components/onboarding/onboarding.component"
import OnboardingTroubleshooting from "Core/onboarding/components/onboarding-troubleshooting/onboarding-troubleshooting.component"
import LayoutDesktopWrapper from "Core/__deprecated__/renderer/wrappers/layout-desktop-wrapper"
import LayoutBlankWrapper from "Core/__deprecated__/renderer/wrappers/layout-blank-wrapper"
import { AboutContainer, BackupContainer } from "Core/settings/components"
import PureSystem from "Core/overview/components/pure-system/pure-system.container"
import LayoutDesktopWrapperWithoutHeader from "Core/__deprecated__/renderer/wrappers/layout-desktop-wrapper-without-header"
import TemplatesContainer from "Core/templates/template.container"
import ConfiguredDevicesDiscovery from "Core/discovery-device/components/configured-devices-discovery.component"
import DevicesInitialization from "Core/device-initialization/components/devices-initialization.component"
import AvailableDeviceListContainer from "Core/discovery-device/components/available-device-list.container"
import DeviceConnecting from "Core/discovery-device/components/device-connecting.component"
import ManageSounds from "Core/files-manager/components/manage-sounds.component"
import { GenericView } from "generic-view/feature"
import { APIConnectionDemo, DataMigrationPage } from "generic-view/ui"
import { ArticlePage, HelpPage } from "help/ui"
import { RecoveryModePage } from "msc-flash-harmony"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => (
  <>
    <Switch>
      <Redirect exact from={URL_MAIN.root} to={URL_ONBOARDING.root} />
      <Redirect from={URL_ONBOARDING.root} to={URL_ONBOARDING.welcome} exact />

      <Route exact path={[...Object.values(URL_ONBOARDING)]}>
        <LayoutBlankWrapper>
          <Route path={URL_ONBOARDING.welcome} component={Onboarding} />
          <Route
            path={URL_ONBOARDING.troubleshooting}
            component={OnboardingTroubleshooting}
          />
        </LayoutBlankWrapper>
      </Route>

      <Route exact path={URL_OVERVIEW.pureSystem}>
        <LayoutDesktopWrapperWithoutHeader>
          <Route path={URL_OVERVIEW.pureSystem} component={PureSystem} />
        </LayoutDesktopWrapperWithoutHeader>
      </Route>

      <Route
        exact
        path={[
          URL_DISCOVERY_DEVICE.root,
          URL_DISCOVERY_DEVICE.deviceConnecting,
        ]}
      >
        <LayoutBlankWrapper closeable={false}>
          <Route
            path={URL_DISCOVERY_DEVICE.root}
            component={ConfiguredDevicesDiscovery}
            exact
          />
          <Route
            path={URL_DISCOVERY_DEVICE.deviceConnecting}
            component={DeviceConnecting}
            exact
          />
        </LayoutBlankWrapper>
      </Route>

      <Route exact path={[URL_DISCOVERY_DEVICE.availableDeviceListModal]}>
        <LayoutBlankWrapper>
          <Route
            path={URL_DISCOVERY_DEVICE.availableDeviceListModal}
            component={AvailableDeviceListContainer}
            exact
          />
        </LayoutBlankWrapper>
      </Route>

      <Route exact path={[...Object.values(URL_DEVICE_INITIALIZATION)]}>
        <LayoutBlankWrapper closeable={false}>
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
            <Route
              path={URL_MAIN.dataMigration}
              component={DataMigrationPage}
            />
            <Route path={URL_MAIN.filesManager} component={FilesManager} />
            <Route path={URL_MAIN.manageSounds} component={ManageSounds} />
            <Route path={URL_MAIN.messages} component={Messages} exact />
            <Route
              path={`${URL_MAIN.messages}${URL_TABS.templates}`}
              component={TemplatesContainer}
            />
            <Route path={URL_MAIN.news} component={News} />
            <Route path={URL_OVERVIEW.root} component={Overview} exact />
            <Route path={URL_MAIN.contacts} component={Contacts} exact />
            <Route path={URL_MAIN.settings} component={BackupContainer} exact />
            <Route
              key="help-category-article"
              path={`${URL_MAIN.help}/:categoryId/:articleId`}
              component={ArticlePage}
            />
            ,
            <Route
              key="help-category"
              path={`${URL_MAIN.help}/:categoryId`}
              component={HelpPage}
            />
            ,
            <Route key="help-root" path={URL_MAIN.help} component={HelpPage} />
            <Route
              path={`${URL_MAIN.settings}${URL_TABS.about}`}
              component={AboutContainer}
            />
            <Route path={URL_MAIN.recoveryMode} component={RecoveryModePage} />
          </Switch>
        </LayoutDesktopWrapper>
      </Route>
      <Redirect to={URL_OVERVIEW.root} />
    </Switch>
  </>
)
