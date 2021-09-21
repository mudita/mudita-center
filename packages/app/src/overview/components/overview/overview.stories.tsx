/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType, CaseColour } from "@mudita/pure"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import { noop } from "Renderer/utils/noop"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import {
  CheckingUpdatesModal,
  DownloadingUpdateCancelledModal,
  DownloadingUpdateFinishedModal,
  DownloadingUpdateInterruptedModal,
  DownloadingUpdateModal,
  UpdateAvailable,
  UpdateNotAvailable,
  UpdateServerError,
  UpdatingFailureWithHelpModal,
  UpdatingSpinnerModal,
  UpdatingSuccessModal,
} from "App/overview/components/overview-modals.component"
import { UpdatingForceModal } from "App/overview/components/overview.modal-dialogs"
import {
  PureOverview,
  PureOverviewProps,
} from "App/overview/components/overview-screens/pure-overview/pure-overview.component"

const fakeState: PureOverviewProps = {
  deviceType: DeviceType.MuditaPure,
  batteryLevel: 0,
  disconnectDevice: false,
  lastBackup: {
    createdAt: "2020-01-15T07:35:01.562Z",
    size: 102400,
  },
  osVersion: "3.0",
  osUpdateAvailable: false,
  osUpdateAlreadyDownloaded: false,
  memorySpace: {
    free: 0,
    full: 16000000000,
  },
  simCards: [],
  networkName: "Orange",
  osUpdateDate: "2020-01-14T11:31:08.244Z",
  language: "en-US",
  caseColour: CaseColour.Gray,
  updatePhoneOsInfo: noop,
  appLatestVersion: "7.7.7",
  lowestSupportedOsVersion: "1.0.0",
  lowestSupportedCenterVersion: "1.0.0",
  settingsLoaded: true,
  appUpdateStepModalDisplayed: false,
  appUpdateAvailable: false,
  appUpdateStepModalShow: false,
}

storiesOf("Views|Overview", module).add("Pure overview", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <PureOverview
        {...fakeState}
        disconnectDevice={action("Disconnect device")}
        changeSim={action("Changing sim")}
        onUpdateCheck={action("Checking update")}
        onUpdateDownload={noop}
        onUpdateInstall={noop}
        onOpenBackupModal={action("Starting backup creation")}
        onOpenBackupRestorationModal={action("Starting backup restoration")}
        setCollectingData={noop}
      />
    </Router>
  </div>
))

const ModalStory: FunctionComponent = ({ children }) => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <PureOverview
        {...fakeState}
        disconnectDevice={action("Disconnect device")}
        changeSim={action("Changing sim")}
        onUpdateCheck={action("Checking update")}
        onUpdateDownload={noop}
        onUpdateInstall={noop}
        onOpenBackupModal={action("Starting backup creation")}
        onOpenBackupRestorationModal={action("Starting backup restoration")}
        setCollectingData={noop}
      />
    </Router>
    <ModalWrapper>{children}</ModalWrapper>
    <ModalBackdrop />
  </div>
)

storiesOf("Views|Overview/Modals", module)
  .add("Checking for updates", () => (
    <ModalStory>
      <CheckingUpdatesModal />
    </ModalStory>
  ))
  .add("Update is available", () => (
    <ModalStory>
      <UpdateAvailable
        version={fakeState.osVersion + ".1"}
        date={new Date().toISOString()}
      />
    </ModalStory>
  ))
  .add("Mudita OS is up to date", () => (
    <ModalStory>
      <UpdateNotAvailable version={fakeState.osVersion} />
    </ModalStory>
  ))
  .add("Checking for update failed", () => (
    <ModalStory>
      <UpdateServerError />
    </ModalStory>
  ))
  .add("Starting download", () => (
    <ModalStory>
      <DownloadingUpdateModal timeLeft={undefined} />
    </ModalStory>
  ))
  .add("Downloading", () => (
    <ModalStory>
      <DownloadingUpdateModal timeLeft={97} speed={56789} percent={34} />
    </ModalStory>
  ))
  .add("Finishing download", () => (
    <ModalStory>
      <DownloadingUpdateModal timeLeft={0} percent={100} />
    </ModalStory>
  ))
  .add("Downloading finished", () => (
    <ModalStory>
      <DownloadingUpdateFinishedModal />
    </ModalStory>
  ))
  .add("Downloading cancelled", () => (
    <ModalStory>
      <DownloadingUpdateCancelledModal />
    </ModalStory>
  ))
  .add("Downloading interrupted", () => (
    <ModalStory>
      <DownloadingUpdateInterruptedModal />
    </ModalStory>
  ))
  .add("Updating force ", () => (
    <ModalStory>
      <UpdatingForceModal open onActionButtonClick={action("Run Update")} />
    </ModalStory>
  ))
  .add("Updating spinner progress", () => (
    <ModalStory>
      <UpdatingSpinnerModal />
    </ModalStory>
  ))
  .add("Updating success", () => (
    <ModalStory>
      <UpdatingSuccessModal />
    </ModalStory>
  ))
  .add("Updating failure with help", () => (
    <ModalStory>
      <UpdatingFailureWithHelpModal
        onContact={action("Go to support")}
        onHelp={action("Go to Help")}
      />
    </ModalStory>
  ))
