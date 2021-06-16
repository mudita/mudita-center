/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"
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
  UpdatingFailureModal,
  UpdatingFailureWithHelpModal,
  UpdatingSpinnerModal,
  UpdatingSuccessModal,
} from "Renderer/modules/overview/overview.modals"
import { Router } from "react-router"
import history from "Renderer/routes/history"
import { action } from "@storybook/addon-actions"

const fakeState = {
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
}

storiesOf("Views|Overview", module).add("Overview", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Router history={history}>
      <OverviewUI
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
      <OverviewUI
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
      <UpdateNotAvailable
        version={fakeState.osVersion}
        date={new Date().toISOString()}
      />
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
  .add("Updating failure", () => (
    <ModalStory>
      <UpdatingFailureModal code={404} onContact={action("Go to Support")} />
    </ModalStory>
  ))
  .add("Updating failure", () => (
    <ModalStory>
      <UpdatingFailureWithHelpModal
        code={404}
        onContact={action("Go to support")}
        onHelp={action("Go to Help")}
      />
    </ModalStory>
  ))
